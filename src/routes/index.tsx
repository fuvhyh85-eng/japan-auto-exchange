import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Japanese Used Cars & Vehicle Export | Nexora Moters" },
      { name: "description", content: "Explore carefully selected Japanese cars, upcoming auction opportunities, wholesale sourcing and worldwide vehicle shipping from Nexora Moters." },
      { property: "og:title", content: "Japanese Vehicles, Shipped Worldwide | Nexora Moters" },
      { property: "og:description", content: "Find quality Japanese used cars, auction previews and wholesale export services with Nexora Moters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});