import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { getAppointments } from "@/lib/queries";
import { getCurrentUserId } from "@/lib/current-user";

export default async function DoctorPatientsPage() {
  const doctorId = await getCurrentUserId();
  const appointments = doctorId ? await getAppointments("doctor", doctorId) : [];
  const patientRows = Array.from(
    new Map(
      appointments.map((appointment) => [
        appointment.patientId,
        {
          id: appointment.patientId,
          name: appointment.patientName,
          lastVisit: appointment.scheduledAt,
          visitCount: appointments.filter((entry) => entry.patientId === appointment.patientId).length,
        },
      ]),
    ).values(),
  );

  return (
    <AppShell role="doctor" title="Patients" subtitle="Only patients who have booked with you appear here, along with their visit history.">
      <section className="space-y-4">
        {patientRows.length > 0 ? patientRows.map((patient) => (
          <Card key={patient.id}>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-semibold text-slate-950">{patient.name}</p>
                <p className="mt-1 text-sm text-slate-500">{patient.visitCount} visits • Last visit {new Date(patient.lastVisit).toLocaleDateString()}</p>
              </div>
              <Link href={`/doctor/patients/${patient.id}`} className="text-sm font-semibold text-sky-700 hover:text-sky-900">
                View records
              </Link>
            </CardContent>
          </Card>
        )) : <EmptyState title="No patients yet" description="Once a patient books you, their profile and records will appear here." />}
      </section>
    </AppShell>
  );
}
