import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientProfileForm } from "@/components/forms/patient-profile-form";
import { getCurrentUserId } from "@/lib/current-user";
import { getPatientProfile } from "@/lib/queries";
import { ArrowRight, HeartPulse, ShieldCheck, User } from "lucide-react";

export default async function PatientProfilePage() {
  const userId = await getCurrentUserId();
  const profile = userId ? await getPatientProfile(userId) : null;

  return (
    <AppShell role="patient" title="Profile" subtitle="Complete your health profile so doctors have the context they need before you arrive.">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/15 text-blue-50">
              <User className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-blue-100">My profile</p>
              <h2 className="mt-2 text-2xl font-semibold">{profile?.fullName ?? "Patient"}</h2>
              <p className="mt-1 text-sm text-blue-100">Health profile for faster care.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white/15 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-blue-100">Heart Rate</p>
              <p className="mt-3 text-xl font-semibold">72 bpm</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/15 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-blue-100">Blood Sugar</p>
              <p className="mt-3 text-xl font-semibold">95 mg/dL</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-[1.75rem] bg-white/15 p-4 text-sm text-blue-100">
            <div className="flex items-center gap-3">
              <HeartPulse className="h-4 w-4" />
              <span>My Saved</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Appointment</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="h-4 w-4" />
              <span>Payment method</span>
            </div>
          </div>
        </aside>

        <Card className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-sm">
          <CardHeader>
            <CardTitle>Edit profile</CardTitle>
          </CardHeader>
          <CardContent>
            {profile ? (
              <PatientProfileForm defaultValues={profile} />
            ) : (
              <p className="text-sm text-slate-600">Sign in to load your profile from Supabase.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
