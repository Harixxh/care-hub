"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signupSchema, type SignupInput } from "@/lib/validators";
import { signUpAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", role: "patient" },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signUpAction(values);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.needsConfirmation) {
        toast.success(result.message ?? "Check your email to confirm your account.");
        router.push("/login?confirmation=sent");
        return;
      }

      toast.success("Account created");
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" placeholder="Enter your name" {...form.register("fullName")} />
        {form.formState.errors.fullName && <p className="text-sm text-rose-600">{form.formState.errors.fullName.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" {...form.register("email")} />
        {form.formState.errors.email && <p className="text-sm text-rose-600">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Create a password" {...form.register("password")} />
        {form.formState.errors.password && <p className="text-sm text-rose-600">{form.formState.errors.password.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select id="role" {...form.register("role")}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </Select>
      </div>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
