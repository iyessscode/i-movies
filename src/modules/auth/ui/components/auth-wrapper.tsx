"use clienit";

import { Tektur } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { IconGoogle } from "@/data/icons";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tekur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const providers = [
  {
    name: "google",
    label: "Continue with Google",
    icon: <IconGoogle />,
  },
] as const;

type Props = {
  children: React.ReactNode;
  type: "sign-in" | "sign-up";
};

export const AuthWrapper = ({ children, type }: Props) => {
  const isSignIn = type === "sign-in";

  const onSocial = (provider: "google") => {
    authClient.signIn.social(
      { provider, callbackURL: "/" },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-y-2 md:mt-0">
      <Link
        href="/"
        className={`flex items-center justify-center text-4xl font-bold ${tekur.className} `}
      >
        <Image src="/logo.svg" alt="logo" height={72} width={72} priority />I
        MOVIES
      </Link>
      <Card className="md:bg-background w-[28rem] gap-y-4 border-0 bg-transparent md:border">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isSignIn ? "Welcome Back" : "Create an Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <div className="after:border-border relative mx-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-4">
            OR
          </span>
        </div>
        <CardFooter className="flex flex-col gap-y-4">
          {providers.map((provider) => (
            <Button
              key={provider.name}
              variant="outline"
              className="h-12 w-full md:h-9"
              onClick={() => onSocial(provider.name)}
            >
              {provider.icon}
              {provider.label}
            </Button>
          ))}
          <p className="text-muted-foreground text-center text-sm">
            {isSignIn ? "Don't have an Account?" : "Already have an Account?"}{" "}
            <Link
              prefetch
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="text-primary pl-2 underline underline-offset-4"
            >
              {" "}
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground flex flex-col items-center text-xs text-balance md:flex-row">
        By signing up or logging in, you consent to I Movies
        <div className="md:pl-1">
          <Link
            prefetch
            href="#"
            className="hover:text-primary/80 underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            prefetch
            href="#"
            className="hover:text-primary/80 underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};
