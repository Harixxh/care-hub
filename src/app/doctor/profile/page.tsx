import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorProfileForm } from "@/components/forms/doctor-profile-form";
import { getCurrentUserId } from "@/lib/current-user";
import { getDoctorProfile } from "@/lib/queries";

export default async function DoctorProfilePage() {
  const doctorId = await getCurrentUserId();
  const profile = doctorId ? await getDoctorProfile(doctorId) : null;

  return (
    <AppShell role="doctor" title="Profile and availability" subtitle="Maintain your specialty, fees, clinic details, and working hours.">
      <Card>
        <CardHeader>
          <CardTitle>Edit doctor profile</CardTitle>
        </CardHeader>
        <CardContent>
          {doctorId ? (
            <DoctorProfileForm doctorId={doctorId} defaultValues={profile ?? undefined} />
          ) : (
            <p className="text-sm text-slate-600">Sign in to load your doctor profile from Supabase.</p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
