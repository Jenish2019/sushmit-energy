'use client';

import MemberManager from '@/components/MemberManager';

export default function AdminManagementPage() {
  return (
    <MemberManager
      apiPath="/api/admin/management"
      title="Management Team"
      description="Manage team member details"
      previewUrl="/our-management-team/"
      accent="#0f8a43"
    />
  );
}
