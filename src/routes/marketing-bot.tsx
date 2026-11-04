import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ComingSoon } from "@/components/app-shell";

export const Route = createFileRoute("/marketing-bot")({
  head: () => ({
    meta: [
      { title: "Marketing Bot — VTAB" },
      { name: "description", content: "Writer, Creative and Brand bots with human approval workflows." },
      { property: "og:title", content: "Marketing Bot — VTAB" },
      { property: "og:description", content: "Writer, Creative and Brand bots with human approval workflows." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ComingSoon title="Marketing Bot" description="Writer, Creative and Brand bots with human approval workflows." icon={Megaphone} />,
});
