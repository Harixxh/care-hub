import { AppShell } from "@/components/layout/app-shell";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatCard } from "@/components/dashboard/stat-card";
import { getAppointments } from "@/lib/queries";
import { RealtimeRefresh } from "@/components/live/realtime-refresh";
import { getCurrentUserId } from "@/lib/current-user";
import { BellRing, CalendarCheck } from "lucide-react";

function isToday(dateInput: string | Date) {
  const date = new Date(dateInput);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export default async function DoctorDashboardPage() {
  const doctorId = await getCurrentUserId();
  const appointments = doctorId ? await getAppointments("doctor", doctorId) : [];

  const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending");
  const acceptedAppointments = appointments.filter((appointment) => appointment.status === "accepted");
  const todaysAppointments = acceptedAppointments.filter((appointment) => isToday(appointment.scheduledAt));
  const patientCount = new Set(appointments.map((appointment) => appointment.patientId)).size;

  return (
    <AppShell
      role="doctor"
      title="Doctor dashboard"
      subtitle="Review incoming requests, monitor today's schedule, and keep patients' records up to date."
    >
      <RealtimeRefresh />

      {/* Top-level stats: quick orientation before anything else */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Today's schedule"
          value={String(todaysAppointments.length)}
          note="Confirmed visits happening today."
        />
        <StatCard
          label="Pending requests"
          value={String(pendingAppointments.length)}
          note="Awaiting your response."
        />
        <StatCard
          label="Total patients"
          value={String(patientCount)}
          note="Unique patients with at least one appointment."
        />
      </section>

      {/* Two clear work queues side by side: what's confirmed vs. what needs a decision */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">
          <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Today&apos;s schedule</h2>
                <p className="text-xs text-slate-500">Confirmed appointments happening today.</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {todaysAppointments.length} {todaysAppointments.length === 1 ? "visit" : "visits"}
            </span>
          </header>
          <div className="divide-y divide-slate-100 px-5 py-2">
            {todaysAppointments.length > 0 ? (
              todaysAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="py-8">
                <EmptyState
                  title="Nothing scheduled today"
                  description="Confirmed appointments for today will show up here."
                />
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border borde
        r-slate-200 bg-white">
          <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <BellRing className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Pending requests</h2>
                <p className="text-xs text-slate-500">Needs Accept, Decline, or Hold.</p>
              </div>
            </div>
            {pendingAppointments.length > 0 && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                {pendingAppointments.length} new
              </span>
            )}
          </header>
          <div className="divide-y divide-slate-100 px-5 py-2">
            {pendingAppointments.length > 0 ? (
              pendingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="py-8">
                <EmptyState
                  title="No pending requests"
                  description="New patient bookings will appear here as they arrive."
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}