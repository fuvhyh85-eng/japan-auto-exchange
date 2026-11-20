export type MarketplaceVehicle = {
  id: string;
  name: string;
  manufacturer: string;
  year: number;
  mileage: number;
  engine: string;
  transmission: string;
  fuel: string;
  grade: string;
  condition: string;
  chassis: string;
  price: number;
  location: string;
  status: string;
  image: string;
  category: string;
};

export const manufacturers = [
  "Toyota",
  "Honda",
  "Nissan",
  "Suzuki",
  "Mazda",
  "Mitsubishi",
  "Subaru",
  "Lexus",
];

export const vehicles: MarketplaceVehicle[] = [
  {
    id: "jp-7140",
    name: "Land Cruiser Prado TX-L",
    manufacturer: "Toyota",
    year: 2022,
    mileage: 22400,
    engine: "2,700 cc",
    transmission: "Automatic",
    fuel: "Petrol",
    grade: "4.5 / A",
    condition: "Excellent · original paint",
    chassis: "TRJ150-0084216",
    price: 32700,
    location: "Yokohama, Japan",
    status: "Available",
    image: "/images/vehicles/land-cruiser.webp",
    category: "SUV",
  },
  {
    id: "jp-3825",
    name: "Skyline GT-R V·spec II",
    manufacturer: "Nissan",
    year: 2002,
    mileage: 48600,
    engine: "2,600 cc",
    transmission: "Manual",
    fuel: "Petrol",
    grade: "4 / B",
    condition: "Very good · collector grade",
    chassis: "BNR34-004821",
    price: 73800,
    location: "Tokyo, Japan",
    status: "Auction · Oct 24",
    image: "/images/vehicles/skyline-gt-r.webp",
    category: "Sports",
  },
  {
    id: "jp-5581",
    name: "Vezel e:HEV Z · Hybrid",
    manufacturer: "Honda",
    year: 2023,
    mileage: 9100,
    engine: "1,500 cc",
    transmission: "Automatic",
    fuel: "Hybrid",
    grade: "5 / A",
    condition: "Pristine · like new",
    chassis: "RV5-1029841",
    price: 18650,
    location: "Nagoya, Japan",
    status: "Available",
    image: "/images/vehicles/honda-vezel.webp",
    category: "Hybrid",
  },
  {
    id: "jp-9042",
    name: "RX-8 Spirit R · 6MT",
    manufacturer: "Mazda",
    year: 2012,
    mileage: 41700,
    engine: "1,300 cc",
    transmission: "Manual",
    fuel: "Petrol",
    grade: "4 / B",
    condition: "Excellent · enthusiast owned",
    chassis: "SE3P-300184",
    price: 16700,
    location: "Kobe, Japan",
    status: "Auction · Oct 26",
    image: "/images/vehicles/mazda-rx-8.webp",
    category: "Sports",
  },
];

export const formatUsd = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);