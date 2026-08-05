'use client';

import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminInvestmentPage() {
  return (
    <StaticPageEditor
      title="Investment Opportunity"
      description="Edit investment opportunity in Nepal page content"
      previewUrl="/investment-oppourtunity/"
      slug="investment-opportunity"
      fields={[
        { key: 'heading', label: 'Heading', type: 'text', initial: 'Investment Opportunity in Nepal' },
        { key: 'content', label: 'Content', type: 'textarea', rows: 8, initial: 'Nepal offers immense potential for hydropower investment. With over 83,000 MW of hydropower potential, the country is poised for significant growth in the renewable energy sector. Sushmit Energy invites domestic and international investors to partner with us in developing sustainable hydropower projects that generate attractive returns while contributing to Nepal\'s energy security.' },
      ]}
    />
  );
}
