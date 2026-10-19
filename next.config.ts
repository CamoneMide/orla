import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first for browsers that accept it, WebP for the rest. Measured on
    // all 50 slots at w640/w1080: 27% fewer bytes, mean SSIM 0.974 -> 0.968.
    // The felt swatches lost visible grain at 75, so they ask for 95.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 95],
  },
};

export default nextConfig;
