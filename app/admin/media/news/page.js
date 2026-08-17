'use client';

import NewsTable from '@/components/NewsTable';

export default function AdminNewsPage() {
  return <NewsTable title="News" description="Manage news, blogs, press releases & updates" defaultCategory="News" showAll />;
}
