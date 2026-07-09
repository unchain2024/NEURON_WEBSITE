import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Allow importing an SVG's raw markup with `import svg from "…svg?raw"`,
    // so filtered SVGs can be inlined into the DOM (crisp on mobile) instead of
    // shown through <img> (which mobile browsers rasterise at low resolution).
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
