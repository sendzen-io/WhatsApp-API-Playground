'use client';

import { PlaygroundContainer } from '@workspace/ui-api-playground';
import { wabaApi } from '@/lib/api/WABAService';
import { templateApi } from '@/lib/api/TemplateService';

/**
 * Playground Wrapper Component for API Playground App
 * This component wraps the shared PlaygroundContainer and provides
 * the API playground-specific service implementations
 */
export default function PlaygroundWrapper() {
  return (
    <div className="bg-background p-4">
    <PlaygroundContainer
      wabaService={wabaApi}
      templateService={templateApi}
      apiEndpoint="facebook"
    />
    </div>
  );
}

