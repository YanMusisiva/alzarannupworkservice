"use client";

import { useUser } from '@/hooks/useUser';
import { CitySelection } from '@/components/CitySelection';
import { Header } from '@/components/Header';
import { AnnouncementFeed } from '@/components/AnnouncementFeed';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { user, isLoading, saveUser } = useUser();

  if (isLoading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-48" />
            </div>
        </div>
    );
  }

  if (!user) {
    return <CitySelection onCitySelect={saveUser} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <AnnouncementFeed city={user.city} />
        </div>
      </main>
    </div>
  );
}
