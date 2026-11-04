import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { ComingSoon } from "@/components/app-shell";

export const Route = createFileRoute("/lead-bot")({
  head: () => ({
    meta: [
      { title: "Lead Bot — VTAB" },
      { name: "description", content: "Autonomous lead discovery, enrichment and qualification." },
      { property: "og:title", content: "Lead Bot — VTAB" },
      { property: "og:description", content: "Autonomous lead discovery, enrichment and qualification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ComingSoon title="Lead Bot" description="Autonomous lead discovery, enrichment and qualification." icon={Bot} />,
});
