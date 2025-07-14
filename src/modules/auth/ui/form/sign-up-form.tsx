"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { SignUpSchema } from "@/data/zod/auth";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { AuthWrapper } from "@/modules/auth/ui/components/auth-wrapper";
import { FormField } from "@/modules/auth/ui/components/form-field";

export const SignUpForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setIsPending(true);
    authClient.signUp.email(values, {
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
    <AuthWrapper type="sign-up">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="******"
            type="password"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="text-foreground mt-2 h-12 w-full font-semibold md:h-9"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
