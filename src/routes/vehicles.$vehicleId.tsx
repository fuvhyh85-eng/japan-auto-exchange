import { createFileRoute } from "@tanstack/react-router";

import { VehicleDetailsPage } from "@/components/site/marketplace-pages";

export const Route = createFileRoute("/vehicles/$vehicleId")({
  head: ({ params }) => ({
    meta: [
      { title: "Japanese Used Vehicle Details & Export Quote | Nexora Moters" },
      { name: "description", content: `Review vehicle specifications, auction grades and indicative FOB Japan pricing for stock ${params.vehicleId} from Nexora Moters.` },
      { property: "og:title", content: "Japanese Vehicle Details & Export Pricing | Nexora Moters" },
      { property: "og:description", content: "Explore specifications, condition details and Japan export enquiries for individually selected Japanese vehicles." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VehicleDetailsRoute,
});

function VehicleDetailsRoute() {
  const { vehicleId } = Route.useParams();
  return <VehicleDetailsPage id={vehicleId} />;
}