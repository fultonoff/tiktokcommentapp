import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["ik.imagekit.io", 'pollinations.ai', 'avatar.vercel.sh'],
  },
};


export default withNextIntl(nextConfig);
