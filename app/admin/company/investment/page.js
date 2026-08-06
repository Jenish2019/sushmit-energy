'use client';

import StaticPageEditor from '@/components/StaticPageEditor';
import { DEFAULTS } from '@/lib/defaults';

export default function AdminInvestmentPage() {
  const inv = DEFAULTS.investment;
  return (
    <StaticPageEditor
      title="Investment Opportunity"
      description="Edit investment opportunity in Nepal page content"
      previewUrl="/investment-oppourtunity/"
      slug="investment-opportunity"
      fields={[
        { key: 'title', label: 'Page Title', type: 'text', initial: inv.title },
        { key: 'subtitle', label: 'Page Subtitle', type: 'text', initial: inv.subtitle },
        { key: 'heading', label: 'Section Heading', type: 'text', initial: inv.heading },
        { key: 'paragraphs', label: 'Content', type: 'richtext', initial: inv.paragraphs, placeholder: 'Write the content paragraphs...' },
        {
          key: 'links', label: 'Important Links', type: 'list', singular: 'Link',
          itemFields: [
            { key: 'name', label: 'Organization', placeholder: 'Organization name' },
            { key: 'url', label: 'Website URL', placeholder: 'https://...' },
          ],
          initial: inv.links,
        },
        {
          key: 'resources', label: 'Related Resources', type: 'list', singular: 'Resource',
          itemFields: [
            { key: 'name', label: 'Resource Name', placeholder: 'Document name' },
            { key: 'file', label: 'File URL', placeholder: 'https://...' },
          ],
          initial: inv.resources,
        },
      ]}
    />
  );
}