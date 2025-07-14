"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { IconLogout } from "@/data/icons";
import { authClient } from "@/lib/auth-client";
import { generateAvatar } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavbarUserButton = () => {
  const router = useRouter();
  const { data } = authClient.useSession();

  if (!data?.session.id) {
    return (
      <Button asChild>
        <Link href="/sign-in">Login</Link>
      </Button>
    );
  }

  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" aria-label="User">
        <Avatar>
          <AvatarImage
            src={
              data.user.image ? data.user.image : generateAvatar(data.user.name)
            }
            alt={data.user.name}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
          />
          <AvatarFallback>
            <Image
              src={generateAvatar(data.user.name)}
              alt={data.user.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
              className="object-cover"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-background border-primary w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border p-2"
        side="bottom"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <p className="truncate font-medium">{data.user.name}</p>
              <span className="text-muted-foreground truncate text-xs">
                {data.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-primary/10" onClick={onSignOut}>
          <IconLogout />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
