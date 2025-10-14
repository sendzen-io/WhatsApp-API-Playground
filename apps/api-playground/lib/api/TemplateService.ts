import { ITemplateService, MessageTemplate } from '@workspace/ui-api-playground';

const FACEBOOK_GRAPH_API_URL = 'https://graph.facebook.com/v21.0';

export const templateApi: ITemplateService = {
  /**
   * Get message templates for a specific WABA from Facebook Graph API
   * @param whatsappBusinessAccountId - The WhatsApp Business Account ID
   * @param accessToken - Facebook access token
   * @returns Promise with array of message templates
   */
  getMessageTemplates: async (
    whatsappBusinessAccountId: string,
    accessToken?: string
  ): Promise<MessageTemplate[]> => {
    if (!accessToken) {
      return [];
    }

    try {
      const response = await fetch(
        `${FACEBOOK_GRAPH_API_URL}/${whatsappBusinessAccountId}/message_templates?fields=id,name,status,category,language,components&status=Approved&access_token=${accessToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch approved templates from Facebook: ${response.statusText}`);
      }

      const data = await response.json();

      // Facebook Graph API returns data in { data: [...] } format
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }

      // Fallback to empty array if no templates found
      return [];
    } catch (error) {
      console.error('Error fetching approved templates from Facebook Graph API:', error);
      throw new Error('Failed to fetch approved templates from Facebook. Please check your access token and WABA ID.');
    }
  },
};

export default templateApi;

