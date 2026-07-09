import { AppShell } from "@/components/layout/app-shell";
import { DoctorCard } from "@/components/dashboard/doctor-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getDoctors } from "@/lib/queries";
import { Search, Stethoscope, HeartPulse, Bandage, Activity } from "lucide-react";

const categories = [
  { label: "General", icon: Stethoscope },
  { label: "Cardio", icon: HeartPulse },
  { label: "Surgery", icon: Bandage },
  { label: "Wellness", icon: Activity },
];

export default async function PatientDoctorsPage({ searchParams }: { searchParams?: Promise<{ q?: string; specialty?: string }> }) {
  const doctors = await getDoctors();
  const filters = (await searchParams) ?? {};
  const query = filters.q?.toLowerCase() ?? "";
  const specialty = filters.specialty?.toLowerCase() ?? "all";
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesQuery = !query || doctor.fullName.toLowerCase().includes(query) || doctor.clinicAddress.toLowerCase().includes(query);
    const matchesSpecialty = specialty === "all" || doctor.specialty.toLowerCase() === specialty;
    return matchesQuery && matchesSpecialty;
  });

  return (
    <AppShell role="patient" title="Browse doctors" subtitle="Search by name, specialty, or availability, then open a doctor profile to book a visit.">
      <section className="grid gap-4 rounded-[2rem] border border-slate-200/70 bg-white/90 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Find doctors</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Search care by specialty or doctor</h2>
          </div>
          <form className="w-full lg:max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input name="q" defaultValue={filters.q} placeholder="Search doctors, clinics, or specialties" className="pl-11" />
            </div>
          </form>
        </div>

        <div className="grid auto-cols-min grid-flow-col gap-3 overflow-x-auto pb-1 scrollbar-none sm:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button key={category.label} type="button" className="flex min-w-[110px] flex-col items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="space-y-5">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Recommended Doctors</h3>
                <p className="mt-1 text-sm text-slate-600">Top-rated specialists near you.</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Featured</span>
            </div>
            {filteredDoctors.length > 0 ? (
              <div className="mt-5 space-y-4">
                {filteredDoctors.slice(0, 2).map((doctor) => (
                  <div key={doctor.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-base font-semibold text-slate-950">{doctor.fullName}</h4>
                    <p className="mt-1 text-sm text-slate-600">{doctor.specialty}</p>
                    <p className="mt-3 text-sm text-slate-500">{doctor.clinicAddress}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-600">No recommendations available yet.</p>
            )}
          </div>

          <section className="grid gap-4 lg:grid-cols-2">
            {filteredDoctors.length > 0 ? filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />) : <EmptyState title="No doctors found" description="Update your filters or add doctor profiles in Supabase." />}
          </section>
        </div>

        <aside className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Your recent doctors</h3>
              <p className="mt-1 text-sm text-slate-600">Quick access to your last viewed profiles.</p>
            </div>
            <button type="button" className="text-sm font-semibold text-blue-700 hover:text-blue-900">View all</button>
          </div>
          <div className="mt-5 space-y-3">
            {filteredDoctors.slice(0, 4).map((doctor) => (
              <div key={doctor.id} className="flex items-center gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
                <div className="h-12 w-12 rounded-3xl bg-blue-50" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-950">{doctor.fullName}</p>
                  <p className="truncate text-xs text-slate-500">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
