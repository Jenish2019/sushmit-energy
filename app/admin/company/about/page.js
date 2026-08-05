'use client';

import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminAboutPage() {
  return (
    <StaticPageEditor
      title="About Us"
      description="Edit company profile, mission, vision & objectives"
      previewUrl="/about-us/"
      slug="about-us"
      fields={[
        { key: 'mission', label: 'Mission Statement', type: 'textarea', rows: 3, initial: 'To be a leading contributor in Nepal\'s energy sector by developing sustainable hydropower projects that drive economic growth and environmental stewardship.' },
        { key: 'vision', label: 'Vision Statement', type: 'textarea', rows: 3, initial: 'To illuminate Nepal with clean, reliable, and affordable hydropower energy, setting the benchmark for renewable energy development in the region.' },
        { key: 'objectives', label: 'Objectives', type: 'textarea', rows: 3, initial: 'Develop and operate hydropower projects with international standards of quality, safety, and environmental responsibility.' },
        { key: 'history', label: 'History / Background', type: 'textarea', rows: 4, initial: 'Sushmit Energy Pvt. Ltd. has been at the forefront of hydropower development in Nepal, working on multiple projects with a combined capacity of over 93 MW.' },
      ]}
    />
  );
}
