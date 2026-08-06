'use client';

import StaticPageEditor from '@/components/StaticPageEditor';
import { DEFAULTS } from '@/lib/defaults';

export default function AdminAboutPage() {
  const a = DEFAULTS.about;
  return (
    <StaticPageEditor
      title="About Us"
      description="Edit company profile, mission, vision & objectives"
      previewUrl="/about-us/"
      slug="about-us"
      fields={[
        { key: 'title', label: 'Page Title', type: 'text', initial: a.title },
        { key: 'subtitle', label: 'Page Subtitle', type: 'text', initial: a.subtitle },
        { key: 'paragraphs', label: 'Company Profile', type: 'richtext', initial: a.paragraphs, placeholder: 'Write about the company...' },
        { key: 'vision', label: 'Vision Statement', type: 'richtext', initial: a.vision, placeholder: 'Vision...' },
        { key: 'mission', label: 'Mission Statement', type: 'richtext', initial: a.mission, placeholder: 'Mission...' },
        { key: 'objectives', label: 'Overall Objectives', type: 'richtext', initial: a.objectives, placeholder: 'Objectives...' },
      ]}
    />
  );
}