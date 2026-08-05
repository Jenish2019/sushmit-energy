'use client';

import ResourceTable from '@/components/ResourceTable';

export default function ReportsPage() {
  return (
    <ResourceTable
      apiPath="/api/admin/reports"
      title="Reports"
      description="Manage annual & quarterly reports for download"
      addLabel="Upload Report"
      typeOptions={['Annual', 'Quarterly', 'Monthly', 'Special']}
    />
  );
}
