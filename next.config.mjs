import bundleAnalyzer from '@next/bundle-analyzer';
import nextPwa from 'next-pwa';

const withPwa = nextPwa({
  dest: 'public'
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
  images: {
    unoptimized: true
  },
  output: 'export'
});

export default withBundleAnalyzer(nextConfig);
