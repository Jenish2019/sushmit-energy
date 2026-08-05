'use client';

import NewsTable from '@/components/NewsTable';

export default function AdminBlogPage() {
  return <NewsTable title="Blog" description="Manage blog posts" defaultCategory="Blog" />;
}
