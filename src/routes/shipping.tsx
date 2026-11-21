import { createFileRoute } from "@tanstack/react-router";

import { ShippingPage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Worldwide Japanese Car Shipping & Export | Nexora Moters" },
      { name: "description", content: "Explore Japanese vehicle shipping routes to Pakistan, the UAE, Kenya, Tanzania and the UK, with an indicative port-to-port freight estimator." },
      { property: "og:title", content: "Worldwide Japanese Vehicle Shipping | Nexora Moters" },
      { property: "og:description", content: "Discover indicative Japan-to-world vehicle shipping routes and plan an international export with Nexora Moters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShippingPage,
});