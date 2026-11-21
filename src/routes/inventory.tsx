import { createFileRoute } from "@tanstack/react-router";

import { InventoryPage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Japanese Car Stocklist & Export Prices | Nexora Moters" },
      { name: "description", content: "Browse selected Toyota, Nissan, Honda, Mazda and other Japanese vehicles, see indicative FOB Japan prices, and request an export quote." },
      { property: "og:title", content: "Browse Japanese Vehicles Available for Export | Nexora Moters" },
      { property: "og:description", content: "Search handpicked Japanese cars by make, type, year and price, with detailed vehicle specifications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InventoryPage,
});