'use client';

import MemberManager from '@/components/MemberManager';

export default function AdminBoardPage() {
  return (
    <MemberManager
      apiPath="/api/admin/board-members"
      title="Board of Directors"
      description="Manage board member details"
      previewUrl="/board-of-directors/"
      accent="#0c50a0"
      showSocial
    />
  );
}
