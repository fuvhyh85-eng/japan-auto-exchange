import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Globe2, Gauge, Heart, Fuel, Menu, Ship, SlidersHorizontal, Sparkles, Truck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatUsd, manufacturers, vehicles, type MarketplaceVehicle } from "@/lib/marketplace-data";

export const pages = {
  home: "/",
  inventory: "/inventory",
  auctions: "/auctions",
  wholesale: "/wholesale",
  shipping: "/shipping",
  buyer: "/buyer-desk",
} as const;

export type PageKey = keyof typeof pages;
type LeadForm = "quote" | "bulk" | "auction" | "shipping" | "contact";

export function BrandMark() {
  return (
    <Link to="/" aria-label="Nippon Auto Exchange home" className="brand-mark">
      <span className="brand-symbol" aria-hidden="true"><span /><span /></span>
      <span className="brand-name">NIPPON<span>AUTO EXCHANGE</span></span>
    </Link>
  );
}

export function SiteHeader({ active = "home" }: { active?: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["inventory", "Vehicles", pages.inventory],
    ["auctions", "Auctions", pages.auctions],
    ["wholesale", "Wholesale", pages.wholesale],
    ["shipping", "Shipping", pages.shipping],
    ["buyer", "Buyer desk", pages.buyer],
  ] as const;

  return (
    <header className="site-header">
      <div className="topbar"><div className="site-container topbar-inner"><span><span className="live-dot" /> JAPAN-BASED · WORLDWIDE DELIVERY</span><a href="mailto:trade@nipponauto.jp">TRADE DESK <ArrowUpRight size={12} /></a><span className="topbar-time"><Globe2 size={12} /> INTERNATIONAL BUYERS WELCOME</span></div></div>
      <div className="site-container nav-row">
        <BrandMark />
        <nav className={menuOpen ? "main-nav mobile-open" : "main-nav"} aria-label="Main navigation">
          {nav.map(([key, label, path]) => <Link key={key} to={path} className={`nav-link${active === key ? " nav-link-active" : ""}`} onClick={() => setMenuOpen(false)}>{label}{key === "auctions" ? <span className="nav-new">LIVE</span> : null}</Link>)}
        </nav>
        <div className="nav-actions"><Button className="button-nav-quote" onClick={() => openLeadEvent("quote")}>Request a quote <ArrowUpRight size={14} /></Button><Button variant="ghost" className="mobile-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </div>
    </header>
  );
}

function openLeadEvent(type: LeadForm, vehicle?: MarketplaceVehicle) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("marketplace:lead", { detail: { type, vehicle } }));
  }
}

export function SiteFooter() {
  return (
    <footer className="site-footer"><div className="site-container"><div className="footer-top"><BrandMark /><p>Japanese vehicles.<br />A world of possibilities.</p><Button className="footer-contact" onClick={() => openLeadEvent("contact")}>Talk to our team <ArrowUpRight size={15} /></Button></div><div className="footer-bottom"><span>© 2026 NIPPON AUTO EXCHANGE · YOKOHAMA, JAPAN</span><span>INSPECTED IN JAPAN. DELIVERED WORLDWIDE.</span><div><Link to={pages.inventory}>Vehicles</Link><Link to={pages.wholesale}>Trade accounts</Link><Link to={pages.shipping}>Shipping</Link></div></div></div></footer>
  );
}

export function LeadDialog() {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<LeadForm>("quote");
  const [vehicle, setVehicle] = useState<MarketplaceVehicle | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<{ type: LeadForm; vehicle?: MarketplaceVehicle }>).detail;
      setKind(detail.type);
      setVehicle(detail.vehicle);
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener("marketplace:lead", listener);
    return () => window.removeEventListener("marketplace:lead", listener);
  }, []);

  const titles: Record<LeadForm, string> = { quote: "Request a vehicle quote", bulk: "Talk to our wholesale desk", auction: "Request a bidding brief", shipping: "Plan a shipment", contact: "Speak with our Japan desk" };

  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="lead-dialog"><DialogHeader><span className="eyebrow">YOKOHAMA TRADE DESK</span><DialogTitle>{submitted ? "Thank you for getting in touch." : titles[kind]}</DialogTitle><DialogDescription>{submitted ? "Your demo enquiry has been received on this page. Live delivery requires connecting the site." : `${vehicle ? `${vehicle.year} ${vehicle.name} · ` : ""}Tell us a little about what you are looking for.`}</DialogDescription></DialogHeader>{submitted ? <div className="lead-success"><Check size={22} /><p>Enquiry noted</p><Button onClick={() => setOpen(false)}>Done</Button></div> : <form className="lead-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="lead-fields"><div className="lead-field"><Label htmlFor="lead-name">Your name</Label><Input id="lead-name" placeholder="Full name" required /></div><div className="lead-field"><Label htmlFor="lead-email">Business email</Label><Input id="lead-email" type="email" placeholder="you@company.com" required /></div><div className="lead-field"><Label htmlFor="lead-market">Destination market</Label><Input id="lead-market" placeholder="e.g. Pakistan, UAE, UK" required /></div><div className="lead-field"><Label htmlFor="lead-interest">{kind === "bulk" ? "Vehicles needed" : kind === "shipping" ? "Vehicles & destination" : kind === "auction" ? "Auction budget (USD)" : "Enquiry type"}</Label><Input id="lead-interest" placeholder={kind === "bulk" ? "Approximate quantity and models" : kind === "auction" ? "Your indicative bid budget" : "Vehicle, quantity or destination"} required={kind !== "quote"} /></div></div><div className="lead-field"><Label htmlFor="lead-notes">A few details</Label><Textarea id="lead-notes" placeholder="Share what you're looking for…" rows={3} /></div><Button type="submit" className="lead-submit">Send enquiry <ArrowUpRight size={15} /></Button><span className="form-disclaimer">DEMO FORM · Your details are not sent or stored.</span></form>}</DialogContent></Dialog>;
}

export function VehicleCard({ car, compact = false }: { car: MarketplaceVehicle; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  return <article className={`vehicle-card${compact ? " vehicle-card-compact" : ""}`}><Link to="/vehicles/$vehicleId" params={{ vehicleId: car.id }} aria-label={`View ${car.name}`} className="vehicle-photo"><img src={car.image} alt={`${car.year} ${car.name}`} loading="lazy" /><span className="vehicle-tag">{car.category}</span><Button aria-label={saved ? "Remove saved vehicle" : "Save vehicle"} title={saved ? "Remove saved vehicle" : "Save vehicle"} className={`save-vehicle${saved ? " is-saved" : ""}`} onClick={(event) => { event.preventDefault(); setSaved(!saved); }}>{saved ? <Check size={16} /> : <Heart size={16} />}</Button><span className="photo-serial">REF. {car.id.toUpperCase()}</span></Link><div className="vehicle-info"><div className="vehicle-overline"><span>{car.manufacturer}</span><span>{car.year} · {car.grade}</span></div><Link to="/vehicles/$vehicleId" params={{ vehicleId: car.id }} className="vehicle-title">{car.name}<ArrowUpRight size={15} /></Link><div className="vehicle-stats"><span><Gauge size={13} />{car.mileage.toLocaleString()} km</span><i /><span><Fuel size={13} />{car.engine}</span><i /><span>{car.transmission}</span></div><div className="vehicle-price"><div><strong>{formatUsd(car.price)}</strong><span>FOB JAPAN</span></div><span className={`vehicle-status${car.status.startsWith("Auction") ? " auction-status" : ""}`}><span />{car.status}</span></div></div></article>;
}

export function InventoryGrid({ filter = "" }: { filter?: string }) {
  const [make, setMake] = useState("All makes");
  const [category, setCategory] = useState("All vehicles");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [maxYear, setMaxYear] = useState(2026);
  const [search, setSearch] = useState(filter);
  const [viewAll, setViewAll] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => vehicles.filter((car) => (make === "All makes" || car.manufacturer === make) && (category === "All vehicles" || car.category === category) && car.price <= maxPrice && car.year <= maxYear && `${car.name} ${car.manufacturer}`.toLowerCase().includes(search.toLowerCase())), [make, category, maxPrice, maxYear, search]);

  const filters = <><label className="filter-field"><span>MAKE</span><select value={make} onChange={(event) => setMake(event.target.value)}><option>All makes</option>{manufacturers.map((brand) => <option key={brand}>{brand}</option>)}</select></label><label className="filter-field"><span>TYPE</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{["All vehicles", "SUV", "Sports", "Hybrid"].map((type) => <option key={type}>{type}</option>)}</select></label><label className="filter-field range-filter"><span>MAXIMUM FOB · {formatUsd(maxPrice)}</span><input aria-label="Maximum price" type="range" min="10000" max="100000" step="5000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /></label><label className="filter-field year-filter"><span>YEAR FROM</span><select value={maxYear} onChange={(event) => setMaxYear(Number(event.target.value))}>{[2026, 2025, 2024, 2023, 2022, 2020].map((year) => <option key={year} value={year}>{year} onwards</option>)}</select></label><Button variant="ghost" className="filter-reset" type="button" onClick={() => { setMake("All makes"); setCategory("All vehicles"); setMaxPrice(100000); setMaxYear(2026); setSearch(""); }}>RESET <ArrowDownRight size={13} /></Button></>;

  return <><div className="market-search"><div className="search-field"><span className="search-icon" /><Input aria-label="Search vehicles" value={search} placeholder="Search make, model or keyword" onChange={(event) => setSearch(event.target.value)} /><span className="search-hint">e.g. LAND CRUISER</span></div><div className="search-results"><span><b>{filtered.length.toString().padStart(2, "0")}</b> VEHICLES</span><span>PRICED FOB JAPAN <ArrowDown size={12} /></span></div></div><div className="filter-bar">{filters}</div><div className="mobile-filter-wrap"><Button variant="outline" className="mobile-filter-trigger" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}><SlidersHorizontal size={16} /> Refine search <span>{filtered.length}</span></Button>{mobileFiltersOpen && <div className="mobile-filter-panel">{filters}</div>}</div><div className="inventory-grid">{(viewAll ? [...filtered, ...filtered.map((car) => ({ ...car, id: `${car.id}-inbound`, name: car.name.replace("TX-L", "TX-L Premium"), status: "Fresh arrival" }))] : filtered).map((car) => <VehicleCard key={car.id} car={car} />)}</div>{filtered.length === 0 && <div className="no-results"><span>NO MATCHES THIS TIME</span><h3>Try a wider search.</h3><Button variant="outline" onClick={() => { setMake("All makes"); setCategory("All vehicles"); setMaxPrice(100000); setMaxYear(2026); setSearch(""); }}>Clear filters</Button></div>}{!filter && filtered.length > 0 && <Button variant="outline" className="load-more" onClick={() => setViewAll(!viewAll)}>{viewAll ? "Show featured vehicles" : "Explore the full inventory"}<ArrowRight size={15} /></Button>}</>;
}

export { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Globe2, Gauge, Heart, Fuel, Ship, Sparkles, Truck };