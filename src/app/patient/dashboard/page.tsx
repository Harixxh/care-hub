import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatCard } from "@/components/dashboard/stat-card";
import { getAppointments, getReports } from "@/lib/queries";
import { RealtimeRefresh } from "@/components/live/realtime-refresh";
import { getCurrentUserId } from "@/lib/current-user";
import { CalendarDays, FileText, Sparkles } from "lucide-react";

export default async function PatientDashboardPage() {
  const patientId = await getCurrentUserId();
  const appointments = patientId ? await getAppointments("patient", patientId) : [];
  const reports = patientId ? await getReports(patientId) : [];
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.scheduledAt) >= new Date());
  const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending");

  return (
    <AppShell role="patient" title="Patient dashboard" subtitle="Track upcoming visits, access quick actions, and keep your care history organized.">
      <RealtimeRefresh />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Upcoming" value={String(upcomingAppointments.length)} note="Appointments scheduled in the future." />
        <StatCard label="Pending" value={String(pendingAppointments.length)} note="Requests waiting on a doctor response." />
        <StatCard label="Records" value={String(reports.length)} note="Reports and documents shared with you." />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-950">Upcoming appointments</h2>
            <Link href="/patient/doctors" className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Book new visit
            </Link>
          </div>
          {appointments.length > 0 ? appointments.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />) : <EmptyState title="No appointments yet" description="Your booked appointments will appear here once you schedule a consultation." />}
        </div>
        <div className="space-y-4 rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
              <p className="text-sm text-slate-500">Stay on top of your care plan.</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex gap-3 rounded-2xl bg-slate-50 p-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-blue-700" />
              <p>Browse doctors by specialty and availability.</p>
            </div>
            <div className="flex gap-3 rounded-2xl bg-slate-50 p-3">
              <FileText className="mt-0.5 h-4 w-4 text-blue-700" />
              <p>Review your records and shared documents.</p>
            </div>
            <div className="flex gap-3 rounded-2xl bg-slate-50 p-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-blue-700" />
              <p>Cancel or reschedule pending appointments.</p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
