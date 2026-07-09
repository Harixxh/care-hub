import { AppShell } from "@/components/layout/app-shell";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { ReportList } from "@/components/dashboard/report-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportUploadForm } from "@/components/forms/report-upload-form";
import { getAppointments, getReports } from "@/lib/queries";
import { getCurrentUserId } from "@/lib/current-user";

export default async function DoctorPatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctorId = await getCurrentUserId();
  const patientAppointments = doctorId ? (await getAppointments("doctor", doctorId)).filter((appointment) => appointment.patientId === id) : [];
  const hasDoctorAccess = patientAppointments.some((appointment) => ["accepted", "completed"].includes(appointment.status));
  const patientReports = doctorId ? await getReports(id, { patientId: id, doctorId }) : [];

  return (
    <AppShell role="doctor" title="Patient record" subtitle="Review appointment history, reports, and upload a new document after the visit.">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-4">
          {patientAppointments.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)}
          <ReportList reports={patientReports} canManage />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upload document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {doctorId && hasDoctorAccess ? <ReportUploadForm patientId={id} doctorId={doctorId} /> : <p className="text-sm text-slate-600">Upload access is available after an accepted or completed appointment with this doctor.</p>}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
