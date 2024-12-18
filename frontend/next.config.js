/** @type {import('next').NextConfig} */
const { config } = require("@fortawesome/fontawesome-svg-core");

config.autoAddCss = false; // Désactiver les styles automatiques de FontAwesome
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
