import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  Bot,
  Check,
  ChevronsUpDown,
  Command,
  LayoutGrid,
  Library,
  Megaphone,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV = [
  { title: "Dashboard", to: "/", icon: LayoutGrid },
  { title: "Lead Bot", to: "/lead-bot", icon: Bot },
  { title: "Marketing Bot", to: "/marketing-bot", icon: Megaphone },
  { title: "Sources & Knowledge", to: "/sources", icon: Library },
  { title: "Settings", to: "/settings", icon: Settings },
] as const;

const WORKSPACES = [
  { name: "Northwind Capital", plan: "Enterprise", initial: "N" },
  { name: "Halcyon Labs", plan: "Growth", initial: "H" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid size-7 place-items-center rounded-lg bg-foreground text-background">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5l8 14 8-14" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary ring-2 ring-sidebar" />
      </div>
      <div className="leading-none">
        <div className="text-[15px] font-semibold tracking-tight">VTAB</div>
        <div className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Sales Intelligence</div>
      </div>
    </div>
  );
}

function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ws = WORKSPACES[active];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-2.5 rounded-lg border border-transparent px-2 py-2 text-left transition-all duration-200 hover:border-border hover:bg-card hover:shadow-soft"
      >
        <span className="grid size-7 place-items-center rounded-md bg-accent text-xs font-semibold text-accent-foreground">{ws.initial}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium">{ws.name}</span>
          <span className="block text-[11.5px] text-muted-foreground">{ws.plan}</span>
        </span>
        <ChevronsUpDown className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
      </button>
      <div
        className={cn(
          "absolute inset-x-0 top-full z-30 mt-1 origin-top rounded-xl border bg-popover p-1 shadow-lift transition-all duration-200",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {WORKSPACES.map((w, i) => (
          <button
            key={w.name}
            onClick={() => { setActive(i); setOpen(false); }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-muted"
          >
            <span className="grid size-6 place-items-center rounded-md bg-muted text-[11px] font-semibold">{w.initial}</span>
            <span className="flex-1 truncate">{w.name}</span>
            {i === active && <Check className="size-3.5 text-primary" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="space-y-0.5">
      {NAV.map((item, i) => {
        const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            style={{ animationDelay: `${80 + i * 40}ms` }}
            className={cn(
              "animate-rise group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-all duration-200",
              active
                ? "bg-card text-foreground shadow-soft ring-1 ring-border"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-primary transition-all duration-300",
                active ? "opacity-100" : "scale-y-0 opacity-0",
              )}
            />
            <item.icon className={cn("size-4 transition-colors", active ? "text-primary" : "group-hover:text-foreground")} strokeWidth={1.8} />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 px-3 py-4">
      <div className="px-2 pt-1"><Logo /></div>
      <WorkspaceSwitcher />
      <div>
        <div className="mb-2 px-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/80">Workspace</div>
        <NavList onNavigate={onNavigate} />
      </div>
      <div className="mt-auto rounded-xl border bg-card p-3.5 shadow-soft">
        <div className="flex items-center gap-2 text-[12.5px] font-medium">
          <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
          Orchestrator online
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
          3 agents running · 12 items awaiting your approval.
        </p>
      </div>
    </div>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-md md:px-8">
      <button onClick={onMenu} className="grid size-9 place-items-center rounded-lg border bg-card md:hidden" aria-label="Open navigation">
        <Menu className="size-4" />
      </button>
      <label
        className={cn(
          "flex h-9 flex-1 items-center gap-2 rounded-lg border bg-card px-3 text-sm transition-all duration-300 md:max-w-md",
          focused ? "border-primary/40 shadow-lift ring-4 ring-ring/20" : "shadow-soft",
        )}
      >
        <Search className="size-4 text-muted-foreground" />
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search leads, campaigns, sources…"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden items-center gap-0.5 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground sm:flex">
          <Command className="size-2.5" />K
        </kbd>
      </label>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95" aria-label="Notifications">
          <Bell className="size-[18px]" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-background" />
        </button>
        <div className="mx-1 h-6 w-px bg-border" />
        <button className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-muted">
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-[12px] font-semibold text-background">CR</span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[13px] font-medium">Chithra R.</span>
            <span className="block text-[11.5px] text-muted-foreground">Head of Growth</span>
          </span>
        </button>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setMobile(false), [path]);

  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-sidebar md:block">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-40 md:hidden", mobile ? "" : "pointer-events-none")}>
        <div
          onClick={() => setMobile(false)}
          className={cn("absolute inset-0 bg-foreground/20 transition-opacity duration-300", mobile ? "opacity-100" : "opacity-0")}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 w-72 border-r bg-sidebar shadow-lift transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            mobile ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <button onClick={() => setMobile(false)} className="absolute right-3 top-4 grid size-8 place-items-center rounded-lg hover:bg-muted" aria-label="Close navigation">
            <X className="size-4" />
          </button>
          {mobile && <SidebarBody onNavigate={() => setMobile(false)} />}
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobile(true)} />
        <main key={path} className="flex-1 animate-rise">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: ReactNode; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</div>}
        <h1 className="text-[34px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[44px]">{title}</h1>
        {description && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function ComingSoon({ title, description, icon: Icon }: { title: string; description: string; icon: typeof Bot }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <PageHeader eyebrow="Module" title={title} description={description} />
      <div className="surface mt-10 grid place-items-center px-6 py-24 text-center">
        <div className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" strokeWidth={1.8} />
        </div>
        <h2 className="mt-5 font-display text-3xl italic">In design</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">This module is next on the roadmap and will share the same design system.</p>
      </div>
    </div>
  );
}
