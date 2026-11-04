import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/app-shell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — VTAB" },
      { name: "description", content: "Workspace, members, integrations and billing." },
      { property: "og:title", content: "Settings — VTAB" },
      { property: "og:description", content: "Workspace, members, integrations and billing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ComingSoon title="Settings" description="Workspace, members, integrations and billing." icon={Settings} />,
});
