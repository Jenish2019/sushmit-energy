'use client';

import StaticPageEditor from '@/components/StaticPageEditor';
import { DEFAULTS } from '@/lib/defaults';

export default function AdminChairmanPage() {
  const c = DEFAULTS.chairman;
  return (
    <StaticPageEditor
      title="Chairman's Message"
      description="Edit the chairman's message page"
      previewUrl="/message-of-chairman/"
      slug="message-of-chairman"
      fields={[
        { key: 'title', label: 'Page Title', type: 'text', initial: c.title },
        { key: 'subtitle', label: 'Page Subtitle', type: 'text', initial: c.subtitle },
        { key: 'name', label: "Chairman's Name", type: 'text', initial: c.name },
        { key: 'role', label: 'Role / Designation', type: 'text', initial: c.role },
        { key: 'image', label: 'Photo URL', type: 'image', placeholder: 'https://...', initial: c.image },
        { key: 'heading', label: 'Message Heading', type: 'text', initial: c.heading },
        { key: 'intro', label: 'Introduction', type: 'richtext', initial: c.intro, placeholder: 'Opening paragraph...' },
        { key: 'paragraphs', label: 'Message Body', type: 'richtext', initial: c.paragraphs, placeholder: 'Main message paragraphs...' },
        { key: 'signoff', label: 'Sign-off Text', type: 'richtext', initial: c.signoff, placeholder: 'Closing line...' },
      ]}
    />
  );
}