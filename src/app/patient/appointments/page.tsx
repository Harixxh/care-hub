import { AppShell } from "@/components/layout/app-shell";
import { PatientAppointmentCard } from "@/components/dashboard/patient-appointment-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getAppointments } from "@/lib/queries";
import { RealtimeRefresh } from "@/components/live/realtime-refresh";
import { getCurrentUserId } from "@/lib/current-user";

export default async function PatientAppointmentsPage() {
  const patientId = await getCurrentUserId();
  const appointments = patientId ? await getAppointments("patient", patientId) : [];

  return (
    <AppShell role="patient" title="Appointments" subtitle="Review every request, current status, and completed visit in one place.">
      <RealtimeRefresh />
      <section className="space-y-4">
        {appointments.length > 0 ? appointments.map((appointment) => <PatientAppointmentCard key={appointment.id} appointment={appointment} />) : <EmptyState title="No appointment history" description="Appointments you book will appear here with status updates from your doctor." />}
      </section>
    </AppShell>
  );
}
