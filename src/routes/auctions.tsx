import { createFileRoute } from "@tanstack/react-router";

import { AuctionsPage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/auctions")({
  head: () => ({
    meta: [
      { title: "Japanese Vehicle Auctions & Upcoming Lots | Nexora Moters" },
      { name: "description", content: "Preview selected Japanese auction vehicles, grades, indicative starting prices and upcoming auction dates with Nexora Moters." },
      { property: "og:title", content: "Japanese Vehicle Auction Preview | Nexora Moters" },
      { property: "og:description", content: "Explore upcoming Japanese auction vehicle previews and request bid guidance from our Japan-based trade desk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuctionsPage,
});