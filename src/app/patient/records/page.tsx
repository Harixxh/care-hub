import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ReportList } from "@/components/dashboard/report-list";
import { getCurrentUserId } from "@/lib/current-user";
import { getReports } from "@/lib/queries";
import { Search, Upload } from "lucide-react";

export default async function PatientRecordsPage() {
  const patientId = await getCurrentUserId();
  const reports = patientId ? await getReports(patientId) : [];

  return (
    <AppShell role="patient" title="Medical records" subtitle="View documents shared with you by your doctor, grouped by type and sorted by date.">
      <section className="grid gap-6 lg:grid-cols-[0.75fr_0.25fr]">
        <div className="space-y-5 rounded-[2rem] border border-slate-200/70 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Medical reports</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Search your health documents</h2>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search reports..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total reports", value: reports.length },
              { label: "Lab reports", value: reports.filter((report) => report.documentType.toLowerCase().includes("lab")).length },
              { label: "Other reports", value: reports.filter((report) => !report.documentType.toLowerCase().includes("lab")).length },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {reports.length > 0 ? <ReportList reports={reports} /> : <EmptyState title="No records yet" description="Documents shared by your doctor will appear here for viewing and download." />}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Reports</p>
              <h3 className="text-lg font-semibold text-slate-950">Upload new file</h3>
            </div>
            <Upload className="h-5 w-5 text-blue-700" />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">Add a new medical document to keep your doctor up to date with your latest reports.</p>
          <button type="button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
            Upload report
          </button>
        </aside>
      </section>
    </AppShell>
  );
}
