import { createFileRoute } from "@tanstack/react-router";

import { BuyerDeskPage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/buyer-desk")({
  head: () => ({
    meta: [
      { title: "Customer Buyer Desk Preview | Nexora Moters" },
      { name: "description", content: "Preview a buyer dashboard for saved Japanese vehicles, trade enquiries, auction bids and international vehicle shipments." },
      { property: "og:title", content: "Japanese Vehicle Customer Buyer Desk | Nexora Moters" },
      { property: "og:description", content: "A visual preview of a customer area for vehicle shortlists, export enquiries and shipment status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuyerDeskPage,
});