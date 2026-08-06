'use client';

import MemberManager from '@/components/MemberManager';
import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminManagementPage() {
  return (
    <>
      <div className="section-heading"><h2>Page Header</h2></div>
      <StaticPageEditor
        compact
        title="Hero & Intro"
        description="These appear at the top of the public page."
        previewUrl="/our-management-team/"
        slug="our-management-team"
        fields={[
          { key: 'title', label: 'Page Title', type: 'text', placeholder: 'Our Management Team' },
          { key: 'subtitle', label: 'Page Subtitle', type: 'text', placeholder: 'Dedicated professionals driving our vision forward' },
          { key: 'intro', label: 'Intro Paragraph', type: 'richtext', placeholder: 'Team introduction...' },
        ]}
      />
      <div className="spacer" />
      <MemberManager
        apiPath="/api/admin/management"
        title="Team Members"
        description="Manage team member details"
        previewUrl="/our-management-team/"
        accent="#0f8a43"
      />
      <style>{`.spacer { height: 36px; } .section-heading h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }`}</style>
    </>
  );
}