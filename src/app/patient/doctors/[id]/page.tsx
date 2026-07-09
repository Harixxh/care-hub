import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "./booking-form";
import { getDoctorById } from "@/lib/queries";
import { ArrowRight, Clock3, MapPin, Star } from "lucide-react";

export default async function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    return (
      <AppShell role="patient" title="Doctor not found" subtitle="This doctor profile is not available in Supabase yet.">
        <Card>
          <CardContent className="p-6 text-sm text-slate-600">No live doctor record was found for this profile id.</CardContent>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell role="patient" title={doctor.fullName} subtitle={`${doctor.specialty} • ${doctor.clinicAddress}`}>
      <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-5">
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="flex flex-col gap-4 rounded-[1.75rem] border border-blue-200/60 bg-blue-50/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-blue-700">Doctor profile</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{doctor.fullName}</p>
                  <p className="mt-1 text-sm text-slate-600">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 shadow-sm">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-slate-950">{doctor.rating?.toFixed(1) ?? "4.8"}</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Consultation fee</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">${doctor.consultationFee}</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Next available</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{doctor.nextAvailable}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>{doctor.bio}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{doctor.clinicAddress}</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {(doctor.availableDays as string[]).map((day: string) => (
                  <span key={day} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm text-slate-700 capitalize">
                    {day}
                  </span>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {doctor.availableHours.split(",").map((slot: string) => (
                  <button key={slot} type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50">
                    {slot}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Book appointment</CardTitle>
              <CardDescription>Choose a slot and submit your booking request.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <BookingForm doctorId={doctor.id} />
              <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
                <ArrowRight className="h-4 w-4" /> Continue to book
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3">
                <Clock3 className="h-5 w-5 text-blue-700" />
                <p className="text-sm text-slate-700">Responses are usually sent within 24 hours.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-950">Need a quick consult?</p>
                <p className="mt-1">Select your preferred day and time to speed up scheduling.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
