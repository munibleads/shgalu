import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com', 'images.unsplash.com'],
  },
};

export default withNextIntl(nextConfig);
