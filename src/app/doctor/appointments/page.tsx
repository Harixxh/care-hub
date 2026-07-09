import { AppShell } from "@/components/layout/app-shell";
import { AppointmentManagementCard } from "@/components/dashboard/appointment-management-card";
import { AppointmentFilterBar } from "@/components/dashboard/appointment-filter-bar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { filterAppointmentsByStatus, getAppointments } from "@/lib/queries";
import { RealtimeRefresh } from "@/components/live/realtime-refresh";
import { getCurrentUserId } from "@/lib/current-user";

export default async function DoctorAppointmentsPage({ searchParams }: { searchParams?: Promise<{ status?: string }> }) {
  const doctorId = await getCurrentUserId();
  const appointments = doctorId ? await getAppointments("doctor", doctorId) : [];
  const filters = (await searchParams) ?? {};
  const status = filters.status ?? "all";
  const filteredAppointments = filterAppointmentsByStatus(appointments, status);

  return (
    <AppShell role="doctor" title="Appointments" subtitle="Accept, decline, or leave bookings waiting while you coordinate your clinical load.">
      <RealtimeRefresh />
      <AppointmentFilterBar active={status} />
      <section className="space-y-4">
        {filteredAppointments.length > 0 ? filteredAppointments.map((appointment) => <AppointmentManagementCard key={appointment.id} appointment={appointment} />) : <EmptyState title="No appointments found" description="Patient bookings will appear here once they submit a request." />}
      </section>
    </AppShell>
  );
}
