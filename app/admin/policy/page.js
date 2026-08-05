'use client';

import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminPolicyPage() {
  return (
    <StaticPageEditor
      title="Policy"
      description="Edit privacy policy & terms page content"
      previewUrl="/policy/"
      slug="policy"
      fields={[
        { key: 'fileUrl', label: 'Policy Document URL (PDF)', type: 'text', placeholder: 'https://...' },
        { key: 'content', label: 'Page Content', type: 'textarea', rows: 10, initial: 'This is the privacy policy and terms of service page for Sushmit Energy. This page outlines how we collect, use, and protect your personal information...' },
      ]}
    />
  );
}
