'use client';

import NewsTable from '@/components/NewsTable';

export default function NewsPage() {
  return (
    <NewsTable
      title="News & Press"
      description="Manage press releases, news articles & notices"
      defaultCategory="News"
      canEditCategory={true}
    />
  );
}
