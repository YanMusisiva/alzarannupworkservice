"use client";

import { Header } from "@/components/Header";
import { CreateAnnouncementForm } from "@/components/CreateAnnouncementForm";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewAnnouncementPage() {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
             <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl space-y-4">
                        <Skeleton className="h-12 w-1/2" />
                        <Skeleton className="h-8 w-3/4" />
                        <div className="space-y-8 pt-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </main>
            </div>
        )
    }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-start justify-center p-4 py-8 md:p-8">
        <CreateAnnouncementForm />
      </main>
    </div>
  );
}
