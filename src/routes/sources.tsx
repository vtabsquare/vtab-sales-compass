import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { ComingSoon } from "@/components/app-shell";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Sources & Knowledge Base — VTAB" },
      { name: "description", content: "Isolated knowledge bases that ground every agent." },
      { property: "og:title", content: "Sources & Knowledge Base — VTAB" },
      { property: "og:description", content: "Isolated knowledge bases that ground every agent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ComingSoon title="Sources & Knowledge Base" description="Isolated knowledge bases that ground every agent." icon={Library} />,
});
