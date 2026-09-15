/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_APP_VERSION: "2.4.0",
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV || "development",
  },
};

export default nextConfig;
