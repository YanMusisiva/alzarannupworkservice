export type AnnouncementCategory = 'Job' | 'Product' | 'Event';

export type Announcement = {
  id: string;
  businessName: string;
  title: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  link?: string;
  city: string;
  createdAt: string; // Using ISO string for localStorage serialization
  category: AnnouncementCategory;
};

export type User = {
  businessName: string;
  city: string;
};
