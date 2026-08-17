'use client';

import ResourceTable from '@/components/ResourceTable';

export default function AdminResourcesPage() {
  return (
    <ResourceTable
      apiPath="/api/admin/media"
      title="Resources"
      description="Manage downloadable resources, media assets & publications"
      addLabel="Add Resource"
      group="media-kit"
      typeOptions={['PDF', 'ZIP', 'DOC', 'Image']}
    />
  );
}
