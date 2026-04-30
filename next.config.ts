import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/princess.png",
        search: "?v=20260430",
      },
      {
        pathname: "/harrison.png",
        search: "",
      },
      {
        pathname: "/default.png",
        search: "",
      },
      {
        pathname: "/princess_crown.png",
        search: "",
      },
      {
        pathname: "/princess_crown_ring.png",
        search: "",
      },
      {
        pathname: "/princess_crown_ring_bracelet.png",
        search: "",
      },
      {
        pathname: "/princess_crown_ring_bracelet_dress.png",
        search: "",
      },
    ],
  },
};

export default nextConfig;
