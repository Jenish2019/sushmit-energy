'use client';

import ResourceTable from '@/components/ResourceTable';

export default function AdminPublicationsPage() {
  return (
    <ResourceTable
      apiPath="/api/admin/media"
      title="Publications"
      description="Manage reports, papers & publications"
      addLabel="Add Publication"
      group="publications"
      typeOptions={['Annual', 'Quarterly', 'Paper', 'Whitepaper']}
    />
  );
}
