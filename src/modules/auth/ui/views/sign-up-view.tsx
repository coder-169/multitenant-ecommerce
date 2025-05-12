"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Poppins } from "next/font/google";
import { Input } from "@/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { registerSchema } from "../../schema";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const SignUpView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: async () => {
        toast.success("Account created! you are signed in");
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
    register.mutate(values);
  };
  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;
  const showPreview = username && !usernameErrors;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F4] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href={"/"}>
                <span
                  className={cn("text-2xl font-semibold", poppins.className)}
                >
                  Groova{" "}
                </span>
              </Link>
              <Button
                variant={"ghost"}
                asChild
                size="sm"
                className="text-base border-none underline"
              >
                <Link prefetch href="sign-in">
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1000+ creators earning money on Groova
            </h1>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden", showPreview && "block")}
                  >
                    Your store will be available <strong>{username}</strong>.shop.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={register.isPending}
              variant={"elevated"}
              type="submit"
              size="lg"
              className="bg-black text-white hover:text-primary hover:bg-pink-400"
            >
              Create account
            </Button>
          </form>
        </Form>
      </div>
      <div
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen w-full lg:col-span-2 hidden lg:block"
      />
    </div>
  );
};

export default SignUpView;
