'use client';

import StaticPageEditor from '@/components/StaticPageEditor';
import { DEFAULTS } from '@/lib/defaults';

export default function AdminOrgChartPage() {
  const o = DEFAULTS.orgChart;
  return (
    <StaticPageEditor
      title="Organizational Chart"
      description="Update the organizational chart page"
      previewUrl="/organizational-chart/"
      slug="organizational-chart"
      fields={[
        { key: 'title', label: 'Page Title', type: 'text', initial: o.title },
        { key: 'subtitle', label: 'Page Subtitle', type: 'text', initial: o.subtitle },
        { key: 'image', label: 'Organizational Chart Image URL', type: 'image', placeholder: 'https://...', initial: o.image },
      ]}
    />
  );
}