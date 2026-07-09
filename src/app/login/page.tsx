import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";
import { ArrowLeft, HeartPlus } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(47,143,229,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(31,200,192,0.14),_transparent_28%),#f8fbff] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <Card className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-[#e3f2fd] text-[#2f8fe5] shadow-sm">
              <HeartPlus className="h-10 w-10" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f8fe5]">Sign In</p>
              <h1 className="mt-4 text-3xl font-semibold text-[#1a1a1a]">Welcome back</h1>
              <p className="mt-3 text-sm leading-7 text-[#6b7280]">Please login to continue to your CareHub workspace and manage appointments, records, and care coordination.</p>
            </div>
            <div className="space-y-6">
              <LoginForm />
            </div>
            <div className="text-center text-sm text-[#6b7280]">
              Don’t have an account? <Link href="/signup" className="font-semibold text-[#2f8fe5] hover:text-[#1c77d0]">Sign up</Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
