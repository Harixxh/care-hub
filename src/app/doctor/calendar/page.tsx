import { AppShell } from "@/components/layout/app-shell";
import { CalendarView } from "@/components/dashboard/calendar-view";
import { getCurrentUserId } from "@/lib/current-user";
import { getAppointments } from "@/lib/queries";

export default async function DoctorCalendarPage() {
  const doctorId = await getCurrentUserId();
  const appointments = doctorId ? await getAppointments("doctor", doctorId) : [];

  return (
    <AppShell role="doctor" title="Calendar" subtitle="View accepted appointments in a month view and track your work across the whole schedule.">
      <CalendarView appointments={appointments.filter((appointment) => appointment.status === "accepted")} />
    </AppShell>
  );
}
