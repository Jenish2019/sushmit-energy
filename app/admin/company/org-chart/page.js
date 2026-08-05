'use client';

import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminOrgChartPage() {
  return (
    <StaticPageEditor
      title="Organizational Chart"
      description="Update the organizational chart image"
      previewUrl="/organizational-chart/"
      slug="organizational-chart"
      fields={[
        { key: 'image', label: 'Organizational Chart Image URL', type: 'image', placeholder: 'https://...', initial: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg' },
      ]}
    />
  );
}
