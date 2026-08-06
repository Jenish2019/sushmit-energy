'use client';

import MemberManager from '@/components/MemberManager';
import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminBoardPage() {
  return (
    <>
      <div className="section-heading"><h2>Page Header</h2></div>
      <StaticPageEditor
        compact
        title="Hero Title & Subtitle"
        description="These appear at the top of the public page."
        previewUrl="/board-of-directors/"
        slug="board-of-directors"
        fields={[
          { key: 'title', label: 'Page Title', type: 'text', placeholder: 'Board of Directors' },
          { key: 'subtitle', label: 'Page Subtitle', type: 'text', placeholder: "Our leadership team guiding Sushmit Energy's vision" },
        ]}
      />
      <div className="spacer" />
      <MemberManager
        apiPath="/api/admin/board-members"
        title="Board Members"
        description="Manage board member details"
        previewUrl="/board-of-directors/"
        accent="#0c50a0"
        showSocial
      />
      <style>{`.spacer { height: 36px; } .section-heading h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }`}</style>
    </>
  );
}