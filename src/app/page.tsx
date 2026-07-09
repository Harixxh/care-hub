import Link from "next/link";
import { ArrowRight, CalendarDays, FileHeart, ShieldCheck, Stethoscope } from "lucide-react";

const featureCards = [
  {
    icon: CalendarDays,
    title: "Booking and scheduling",
    description: "Patients request slots, doctors approve, and accepted visits flow into a live calendar.",
  },
  {
    icon: FileHeart,
    title: "Secure medical records",
    description: "Reports are stored in Supabase Storage and linked to appointments, owners, and clinicians.",
  },
  {
    icon: ShieldCheck,
    title: "RLS-first access control",
    description: "Every table and bucket is protected so people only see the data they should.",
  },
];

const audiences = [
  {
    title: "For patients",
    points: ["Find doctors by specialty and availability", "Book and track appointments", "Upload and review reports"],
  },
  {
    title: "For doctors",
    points: ["Manage requests with Accept / Decline / Waiting", "View live schedule in a calendar", "Keep patient records in one place"],
  },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="soft-grid absolute inset-0 opacity-30" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8 lg:gap-10 lg:py-6">
        <header className="glass-panel sticky top-3 z-20 flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl brand-card text-white shadow-lg">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-950">CareHub</p>
              <p className="text-xs text-slate-500">Appointments, records, and care coordination</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium sm:gap-3">
            <Link href="/login" className="rounded-full px-3 py-2 text-slate-700 transition hover:bg-white/80 sm:px-4">
              Login
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-800">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="animate-fade-up space-y-6 lg:space-y-8">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
              A refined care platform for patients and clinicians
            </span>
            <div className="space-y-4 lg:space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Book care, manage schedules, and keep medical records connected.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                CareHub brings appointment booking, real-time updates, secure report storage, and role-aware dashboards into one polished experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800">
                Start as patient or doctor <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="glass-panel rounded-[1.5rem] p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-base font-semibold text-slate-950">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="animate-fade-up space-y-4">
            <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
              <div className="brand-card rounded-[1.5rem] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Live preview</p>
                <h2 className="mt-3 text-2xl font-semibold">Today at CareHub</h2>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Pending appointments, accepted visits, and patient records are all organized by role.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Pending", "12 requests"],
                    ["Accepted", "18 visits"],
                    ["Reports", "44 files"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-blue-50">{label}</p>
                      <p className="mt-2 text-lg font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {audiences.map((audience) => (
                  <div key={audience.title} className="rounded-[1.4rem] border border-slate-200/80 bg-white/80 p-4">
                    <h3 className="text-base font-semibold text-slate-950">{audience.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {audience.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
