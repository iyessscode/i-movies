"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { SignInSchema } from "@/data/zod/auth";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { AuthWrapper } from "@/modules/auth/ui/components/auth-wrapper";
import { FormField } from "@/modules/auth/ui/components/form-field";

export const SignInForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setIsPending(true);
    authClient.signIn.email(values, {
      onSuccess: () => {
        setIsPending(false);
        router.push("/");
      },
      onError: (ctx) => {
        setIsPending(false);
        toast.error(ctx.error.message || "Something went wrong");
      },
    });
  };
  return (
    <AuthWrapper type="sign-in">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="******"
            type="password"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="text-foreground mt-2 h-12 w-full font-semibold md:h-9"
          >
            Sign In
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
