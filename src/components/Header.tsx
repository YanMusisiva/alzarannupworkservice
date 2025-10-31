"use client";

import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { AnnLogo } from '@/components/AnnLogo';
import { MapPin, PlusCircle, LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <AnnLogo className="h-8 w-auto" />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user && (
              <>
                <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground md:flex">
                  <MapPin className="h-4 w-4" />
                  <span>{user.city}</span>
                </div>
                <Button asChild>
                  <Link href="/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Post
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out">
                    <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
