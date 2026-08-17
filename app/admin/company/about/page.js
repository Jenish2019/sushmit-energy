'use client';

import StaticPageEditor from '@/components/StaticPageEditor';
import { DEFAULTS } from '@/lib/defaults';

export default function AdminAboutPage() {
  const a = DEFAULTS.about;
  return (
    <StaticPageEditor
      title="About Us"
      description="Edit company profile"
      previewUrl="/about-us/"
      slug="about-us"
      fields={[
        { key: 'title', label: 'Page Title', type: 'text', initial: a.title },
        { key: 'subtitle', label: 'Page Subtitle', type: 'text', initial: a.subtitle },
        { key: 'paragraphs', label: 'Company Profile', type: 'richtext', initial: a.paragraphs, placeholder: 'Write about the company...' },
      ]}
    />
  );
}