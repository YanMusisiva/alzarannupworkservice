"use client";

import { useState, useEffect } from 'react';
import { isAfter, subDays } from 'date-fns';
import { getAnnouncements } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { AnnouncementCard } from './AnnouncementCard';
import { Newspaper } from 'lucide-react';

interface AnnouncementFeedProps {
  city: string;
}

export function AnnouncementFeed({ city }: AnnouncementFeedProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const allAnnouncements = getAnnouncements();
    const oneWeekAgo = subDays(new Date(), 7);

    const filtered = allAnnouncements.filter(
      (ann) => ann.city.toLowerCase() === city.toLowerCase() && isAfter(new Date(ann.createdAt), oneWeekAgo)
    );

    setAnnouncements(filtered);
  }, [city]);

  if (announcements.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center text-muted-foreground">
        <Newspaper className="h-16 w-16" />
        <h2 className="text-2xl font-headline font-semibold">No Buzz in {city} Yet</h2>
        <p>It's quiet right now... Why not be the first to create an announcement?</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}
