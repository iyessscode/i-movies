import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { IconChevronLeft } from "@/data/icons";
import { auth } from "@/lib/auth";

import { Button } from "@/components/ui/button";

type AuthLayoutProps = {
  children: React.ReactNode;
};
export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return (
    <section className="relative h-screen">
      <Button
        className="absolute top-6 left-6 size-8 rounded-full"
        variant="ghost"
        asChild
      >
        <Link href="/">
          <IconChevronLeft className="text-foreground size-6" />
        </Link>
      </Button>
      <main className="flex h-screen items-start justify-center md:items-center">
        {children}
      </main>
    </section>
  );
}
