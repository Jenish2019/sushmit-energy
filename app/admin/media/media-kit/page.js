'use client';

import ResourceTable from '@/components/ResourceTable';

export default function AdminMediaKitPage() {
  return (
    <ResourceTable
      apiPath="/api/admin/media"
      title="Media Kit"
      description="Manage downloadable resources & brand assets"
      addLabel="Add Resource"
      group="media-kit"
      typeOptions={['PDF', 'ZIP', 'DOC', 'Image']}
    />
  );
}
