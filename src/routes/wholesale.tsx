import { createFileRoute } from "@tanstack/react-router";

import { WholesalePage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Japanese Vehicle Wholesale & Bulk Export | Nexora Moters" },
      { name: "description", content: "Source multiple Japanese vehicles, plan export containers and request a tailored wholesale quote for your market with Nexora Moters." },
      { property: "og:title", content: "Wholesale Japanese Cars and Bulk Orders | Nexora Moters" },
      { property: "og:description", content: "Build your next Japanese vehicle shipment with selected inventory, local sourcing and coordinated export support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WholesalePage,
});