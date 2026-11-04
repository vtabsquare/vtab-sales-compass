import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight, Bot, CheckCircle2, Clock, Megaphone, PenLine, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VTAB Sales Intelligence" },
      { name: "description", content: "Executive overview of pipeline, AI agents and approvals in VTAB." },
      { property: "og:title", content: "Dashboard — VTAB Sales Intelligence" },
      { property: "og:description", content: "Executive overview of pipeline, AI agents and approvals in VTAB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const RANGES = ["7D", "30D", "90D"] as const;
const series: Record<(typeof RANGES)[number], { d: string; v: number }[]> = {
  "7D": [38, 44, 41, 52, 58, 55, 64].map((v, i) => ({ d: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i], v })),
  "30D": [120, 132, 128, 150, 162, 158, 176, 190, 184, 205].map((v, i) => ({ d: `W${i + 1}`, v })),
  "90D": [310, 340, 330, 380, 420, 410, 470, 520, 505, 560, 610, 640].map((v, i) => ({ d: `W${i + 1}`, v })),
};

const KPIS = [
  { label: "Pipeline influenced", value: "$4.82M", delta: "+18.4%" },
  { label: "Qualified leads", value: "1,284", delta: "+12.1%" },
  { label: "Meetings booked", value: "96", delta: "+9.6%" },
  { label: "Content published", value: "42", delta: "+24%" },
];

const AGENTS = [
  { name: "Lead Bot", task: "Qualifying 214 accounts in Fintech · EU", progress: 68, icon: Bot },
  { name: "Writer Bot", task: "Drafting Q4 nurture sequence (5 emails)", progress: 42, icon: PenLine },
  { name: "Creative Bot", task: "Generating LinkedIn carousel variants", progress: 85, icon: Sparkles },
  { name: "Brand Bot", task: "Reviewing tone across 18 assets", progress: 23, icon: Megaphone },
];

const APPROVALS = [
  { title: "Outreach to Meridian Health — VP Ops", meta: "Lead Bot · Fit score 92", time: "4m" },
  { title: "LinkedIn post: “The cost of slow follow-up”", meta: "Writer Bot · Brand-checked", time: "18m" },
  { title: "Retargeting creative set B (3 variants)", meta: "Creative Bot", time: "1h" },
  { title: "Sequence: Series B SaaS founders", meta: "Lead Bot · 48 contacts", time: "2h" },
];

const SOURCES = [
  { name: "LinkedIn Sales Nav", share: 38 },
  { name: "Website intent", share: 27 },
  { name: "Partner referrals", share: 19 },
  { name: "Events & webinars", share: 16 },
];

function Dashboard() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30D");
  const [done, setDone] = useState<number[]>([]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <PageHeader
        eyebrow="Wednesday, 4 November"
        title={<>Good afternoon, Chithra. <span className="font-display text-[1.08em] italic tracking-normal text-muted-foreground">Pipeline is up.</span></>}
        description="Your agents qualified 86 new accounts overnight. Four items need your review."
        actions={
          <button className="group inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-[13.5px] font-medium text-background shadow-lift transition-all duration-200 hover:-translate-y-px active:translate-y-0">
            Review approvals
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        }
      />

      {/* KPI strip — one surface, divided, not four cards */}
      <section className="surface mt-12 grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x [&>*:nth-child(odd)]:border-r lg:[&>*:nth-child(odd)]:border-r-0 [&>*:nth-child(-n+2)]:border-b lg:[&>*:nth-child(-n+2)]:border-b-0">
        {KPIS.map((k, i) => (
          <div key={k.label} className="animate-rise group p-5 transition-colors hover:bg-subtle md:p-6" style={{ animationDelay: `${120 + i * 70}ms` }}>
            <div className="text-[12.5px] text-muted-foreground">{k.label}</div>
            <div className="mt-3 text-[28px] font-medium tracking-[-0.03em] tabular-nums md:text-[32px]">{k.value}</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11.5px] font-medium text-success">
              <ArrowUpRight className="size-3" /> {k.delta}
            </div>
          </div>
        ))}
      </section>

      {/* Chart + sources */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="surface animate-rise p-6 lg:col-span-2" style={{ animationDelay: "300ms" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-medium">Qualified pipeline</h2>
              <p className="mt-1 text-[13px] text-muted-foreground">Leads scored ≥ 70 by Lead Bot</p>
            </div>
            <div className="relative flex rounded-lg bg-muted p-0.5">
              <span
                className="absolute inset-y-0.5 w-12 rounded-md bg-card shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(${RANGES.indexOf(range) * 48}px)` }}
              />
              {RANGES.map((r) => (
                <button key={r} onClick={() => setRange(r)} className={cn("relative z-10 h-7 w-12 font-mono text-[11.5px] transition-colors", r === range ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series[range]} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip
                  cursor={{ stroke: "var(--border)" }}
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", background: "var(--popover)", boxShadow: "var(--shadow-lift)", fontSize: 12 }}
                />
                <Area key={range} type="monotone" dataKey="v" name="Leads" stroke="var(--chart-1)" strokeWidth={2} fill="url(#fillV)" animationDuration={900} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface animate-rise p-6" style={{ animationDelay: "380ms" }}>
          <h2 className="text-[15px] font-medium">Lead sources</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Share of qualified leads</p>
          <div className="mt-7 space-y-5">
            {SOURCES.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between text-[13px]">
                  <span>{s.name}</span>
                  <span className="font-mono text-muted-foreground tabular-nums">{s.share}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="animate-grow h-full rounded-full bg-primary" style={{ width: `${s.share * 2.2}%`, opacity: 1 - i * 0.18, animationDelay: `${500 + i * 90}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents + approvals */}
      <section className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="surface animate-rise lg:col-span-3" style={{ animationDelay: "460ms" }}>
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-[15px] font-medium">Agent activity</h2>
            <span className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success animate-pulse-dot" /> Live
            </span>
          </div>
          <ul className="divide-y">
            {AGENTS.map((a) => (
              <li key={a.name} className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-subtle">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border bg-card text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                  <a.icon className="size-4" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-medium">{a.name}</div>
                  <div className="truncate text-[12.5px] text-muted-foreground">{a.task}</div>
                </div>
                <div className="hidden w-28 sm:block">
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <div className="animate-grow h-full rounded-full bg-foreground/80" style={{ width: `${a.progress}%`, animationDelay: "650ms" }} />
                  </div>
                </div>
                <span className="w-9 text-right font-mono text-[12px] text-muted-foreground tabular-nums">{a.progress}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface animate-rise lg:col-span-2" style={{ animationDelay: "540ms" }}>
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-[15px] font-medium">Awaiting approval</h2>
            <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] text-accent-foreground">{APPROVALS.length - done.length}</span>
          </div>
          <ul className="divide-y">
            {APPROVALS.map((a, i) => {
              const ok = done.includes(i);
              return (
                <li key={a.title} className={cn("flex items-start gap-3 px-6 py-4 transition-all duration-500", ok && "opacity-45")}>
                  <button
                    onClick={() => setDone((d) => (ok ? d.filter((x) => x !== i) : [...d, i]))}
                    aria-label={ok ? "Undo approval" : "Approve"}
                    className={cn("mt-0.5 transition-all duration-300 active:scale-90", ok ? "text-success" : "text-muted-foreground/50 hover:text-primary")}
                  >
                    <CheckCircle2 className="size-[18px]" strokeWidth={1.8} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className={cn("text-[13.5px] font-medium leading-snug transition-all", ok && "line-through")}>{a.title}</div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground">{a.meta}</div>
                  </div>
                  <span className="flex items-center gap-1 text-[11.5px] text-muted-foreground"><Clock className="size-3" />{a.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
