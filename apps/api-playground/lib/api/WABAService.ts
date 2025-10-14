// WABA Service for API Playground
// ========================================
// This service uses Facebook Graph API directly (graph.facebook.com)
// 
// API ENDPOINTS:
// - API Playground: graph.facebook.com (this file)
// - Product App: api.sendzen.io (apps/product/lib/api/WABAService.ts)
// ========================================

import { IWABAService, WABADetailsResponse, APIKeyResponse } from '@workspace/ui-api-playground';

const FACEBOOK_GRAPH_API_URL = 'https://graph.facebook.com/v21.0';

export const wabaApi: IWABAService = {
  /**
   * Get business list from Facebook Graph API
   */
  getBusinesses: async (accessToken: string): Promise<Array<{id: string, name: string}>> => {
    try {
      const response = await fetch(
        `${FACEBOOK_GRAPH_API_URL}/me/businesses?access_token=${accessToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch businesses: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching businesses from Facebook Graph API:', error);
      throw new Error('Failed to fetch businesses from Facebook. Please check your access token.');
    }
  },

  /**
   * Get WABA list for a specific business from Facebook Graph API
   */
  getWABAsForBusiness: async (businessId: string, accessToken: string): Promise<Array<{
    wabaId: string;
    wabaBusinessName: string;
    phoneNumbers: Array<{
      phoneNumberId: string;
      phoneNumber: string;
      numberStatus: string;
    }>;
  }>> => {
    try {
      const response = await fetch(
        `${FACEBOOK_GRAPH_API_URL}/${businessId}/owned_whatsapp_business_accounts?fields=id,name,account_review_status,phone_numbers{id,display_phone_number,verified_name,code_verification_status}&access_token=${accessToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch WABAs: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        return [];
      }

      return data.data.map((waba: any) => ({
        wabaId: waba.id,
        wabaBusinessName: waba.name || 'Unknown',
        phoneNumbers: (waba.phone_numbers?.data || []).map((phone: any) => ({
          phoneNumberId: phone.id,
          phoneNumber: phone.display_phone_number,
          numberStatus: phone.code_verification_status === 'VERIFIED' ? 'Active' : 'Pending',
        }))
      }));
    } catch (error) {
      console.error('Error fetching WABAs from Facebook Graph API:', error);
      throw new Error('Failed to fetch WABAs from Facebook. Please check your access token.');
    }
  },

  /**
   * Get WABA details from Facebook Graph API (legacy method for compatibility)
   * Note: This requires a valid access token to be provided by the user in the playground
   */
  getWABADetails: async (accessToken?: string): Promise<WABADetailsResponse> => {
    if (!accessToken) {
      // Return empty state if no access token provided
      return { projects: [] };
    }

    try {
      // Get user's business accounts from Facebook Graph API
      const businesses = await wabaApi.getBusinesses!(accessToken);

      if (businesses.length === 0) {
        return { projects: [] };
      }

      // Fetch WABA for each business
      const projects = await Promise.all(
        businesses.map(async (business) => {
          try {
            const wabas = await wabaApi.getWABAsForBusiness!(business.id, accessToken);

            if (wabas.length === 0) {
              return null;
            }

            return {
              projectId: business.id,
              projectName: business.name,
              wabas: wabas.map((waba) => ({
                ...waba,
                setupMode: 'byo' as const, // API Playground uses BYO (Bring Your Own)
              }))
            };
          } catch (error) {
            console.error(`Error fetching WABA for business ${business.id}:`, error);
            return null;
          }
        })
      );

      // Filter out null values and return
      const validProjects = projects.filter((p): p is NonNullable<typeof p> => p !== null);

      return {
        projects: validProjects
      };
    } catch (error) {
      console.error('Error fetching WABA details from Facebook Graph API:', error);
      throw new Error('Failed to fetch WABA details from Facebook. Please check your access token.');
    }
  },

  /**
   * Get API key - Not applicable for direct Facebook Graph API
   * In API Playground, users provide their own access token
   */
  getAPIKey: async (projectId: string): Promise<APIKeyResponse> => {
    // For API playground, we don't retrieve API keys from SendZen
    // Users provide their own Facebook access token
    return {
      apiKey: '',
    };
  },
};

export default wabaApi;

