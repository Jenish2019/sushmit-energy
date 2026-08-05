'use client';

import StaticPageEditor from '@/components/StaticPageEditor';

export default function AdminChairmanPage() {
  return (
    <StaticPageEditor
      title="Chairman's Message"
      description="Edit the chairman's message page"
      previewUrl="/message-of-chairman/"
      slug="message-of-chairman"
      fields={[
        { key: 'name', label: "Chairman's Name", type: 'text', initial: 'Mr. Chairman Name' },
        { key: 'image', label: 'Photo URL', type: 'image', placeholder: 'https://...', initial: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg' },
        { key: 'message', label: 'Message', type: 'textarea', rows: 8, initial: 'Welcome to Sushmit Energy. It is my privilege to lead this remarkable organization that is at the forefront of Nepal\'s renewable energy revolution. Our commitment to sustainable hydropower development is unwavering...' },
      ]}
    />
  );
}
