import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Announcement } from '@/lib/types';
import { ArrowUpRight, Briefcase, Calendar, ShoppingBag } from 'lucide-react';

const categoryIcons = {
  Job: <Briefcase className="h-4 w-4" />,
  Product: <ShoppingBag className="h-4 w-4" />,
  Event: <Calendar className="h-4 w-4" />,
};

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const timeAgo = formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true });

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      {announcement.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={announcement.imageUrl}
            alt={announcement.title}
            fill
            className="object-cover"
            data-ai-hint={announcement.imageHint || ''}
          />
        </div>
      )}
      <CardHeader>
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-semibold">{announcement.businessName}</span>
          <span>{timeAgo}</span>
        </div>
        <CardTitle className="font-headline text-xl">{announcement.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-card-foreground/90">{announcement.content}</p>
      </CardContent>
      <CardFooter className="flex-wrap items-center justify-between gap-2">
        <Badge variant="secondary" className="flex items-center gap-2 py-1 px-3">
            {categoryIcons[announcement.category]}
            {announcement.category}
        </Badge>
        {announcement.link && (
          <Button asChild variant="link" className="px-0 text-accent-foreground hover:text-primary">
            <Link href={announcement.link} target="_blank" rel="noopener noreferrer">
              Learn More <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
