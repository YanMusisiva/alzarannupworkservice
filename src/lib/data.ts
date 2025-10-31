import type { Announcement } from './types';
import { subDays } from 'date-fns';

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    businessName: 'The Daily Grind',
    title: "We're Hiring Baristas!",
    content: 'Passionate about coffee? Join our team! We are looking for experienced baristas to craft the perfect cup for our amazing customers. Full-time and part-time positions available.',
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    imageHint: 'hiring sign',
    link: 'https://example.com/jobs',
    city: 'Springfield',
    createdAt: new Date().toISOString(),
    category: 'Job',
  },
  {
    id: '2',
    businessName: 'Artisan Bakes',
    title: 'New Sourdough Croissants!',
    content: 'Come try our new, flaky, buttery sourdough croissants. Baked fresh daily. Limited quantities available!',
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    imageHint: 'fresh pastries',
    city: 'Springfield',
    createdAt: subDays(new Date(), 2).toISOString(),
    category: 'Product',
  },
  {
    id: '3',
    businessName: 'Greenleaf Books',
    title: 'Author Meet & Greet this Saturday',
    content: 'Meet local author Jane Doe and get your copy of "The Last Page" signed. Event starts at 2 PM.',
    imageUrl: 'https://picsum.photos/seed/105/600/400',
    imageHint: 'community event',
    city: 'Shelbyville',
    createdAt: subDays(new Date(), 4).toISOString(),
    category: 'Event',
  },
    {
    id: '4',
    businessName: 'Vintage Threads',
    title: 'Expired: Grand Opening Last Month',
    content: 'This announcement is older than 7 days and should not be visible in the feed.',
    city: 'Springfield',
    createdAt: subDays(new Date(), 8).toISOString(),
    category: 'Event',
  },
];

const ANNOUNCEMENTS_STORAGE_KEY = 'ann-announcements';

const isServer = typeof window === 'undefined';

export function getAnnouncements(): Announcement[] {
  if (isServer) return [];
  
  const storedAnnouncements = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
  if (!storedAnnouncements) {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(initialAnnouncements));
    return initialAnnouncements;
  }
  
  try {
    return JSON.parse(storedAnnouncements);
  } catch (error) {
    console.error("Failed to parse announcements from localStorage", error);
    return [];
  }
}

export function addAnnouncement(announcementData: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
  if (isServer) throw new Error("Cannot add announcement from server");

  const announcements = getAnnouncements();
  const newAnnouncement: Announcement = {
    ...announcementData,
    id: new Date().getTime().toString(),
    createdAt: new Date().toISOString(),
  };

  const updatedAnnouncements = [newAnnouncement, ...announcements];
  localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(updatedAnnouncements));
  return newAnnouncement;
}
