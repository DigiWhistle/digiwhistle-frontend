/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "test.com"],
  },
};

export default nextConfig;
