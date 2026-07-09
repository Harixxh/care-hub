"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, CalendarDays, FileText, Home, LayoutGrid, LogOut, ShieldCheck, Stethoscope, UserRound, Users } from "lucide-react";
import type { Role } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { signOutAction } from "@/app/actions";

const roleLinks: Record<Role, { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  patient: [
    { label: "Dashboard", href: "/patient/dashboard", icon: Home },
    { label: "Doctors", href: "/patient/doctors", icon: Stethoscope },
    { label: "Appointments", href: "/patient/appointments", icon: CalendarDays },
    { label: "Records", href: "/patient/records", icon: FileText },
    { label: "Profile", href: "/patient/profile", icon: UserRound },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor/dashboard", icon: LayoutGrid },
    { label: "Appointments", href: "/doctor/appointments", icon: CalendarDays },
    { label: "Calendar", href: "/doctor/calendar", icon: Activity },
    { label: "Patients", href: "/doctor/patients", icon: Users },
    { label: "Profile", href: "/doctor/profile", icon: UserRound },
  ],
  admin: [{ label: "Dashboard", href: "/admin/dashboard", icon: ShieldCheck }],
};

export function AppShell({ role, title, subtitle, children }: React.PropsWithChildren<{ role: Role; title: string; subtitle: string }>) {
  const pathname = usePathname();
  const signedInLabel = role === "doctor" ? "Doctor account" : role === "patient" ? "Patient account" : "Admin account";

  return (
    <div className="min-h-screen px-3 py-3 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[260px_1fr] lg:gap-6">
        <aside className="glass-panel rounded-[2rem] p-4 sm:p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl brand-card text-white shadow-lg">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold tracking-tight text-slate-950">CareHub</p>
              <p className="text-sm text-slate-500">{role} workspace</p>
            </div>
          </Link>

          <nav className="mt-8 hidden space-y-2 lg:block">
            {roleLinks[role].map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-blue-700 text-white shadow-[0_12px_30px_rgba(29,78,216,0.18)]" : "text-slate-700 hover:bg-white hover:text-slate-950"}`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <Badge className={active ? "border-transparent bg-white/15 text-white" : "border-transparent bg-slate-100 text-slate-600"}>Open</Badge>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-[1.5rem] brand-card p-5 text-white">
            <p className="text-[11px] uppercase tracking-[0.24em] text-blue-100">Signed in as</p>
            <p className="mt-2 text-lg font-semibold">{signedInLabel}</p>
            <p className="mt-1 text-sm text-blue-100">Role-aware access with secure Supabase workflows</p>
          </div>

          <form action={signOutAction} className="mt-4">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </form>
        </aside>

        <main className="space-y-4 pb-24 lg:pb-0">
          <section className="glass-panel rounded-[2rem] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Badge className="bg-blue-50 text-blue-700">{role}</Badge>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
                <p className="font-semibold text-slate-950">CareHub</p>
                <p>Professional care coordination</p>
              </div>
            </div>
          </section>
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/90 px-2 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around gap-1">
          {roleLinks[role].map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold ${active ? "bg-blue-700 text-white" : "text-slate-600"}`}>
                <Icon className="mb-1 h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
