/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mir-s3-cdn-cf.behance.net", "dt2sdf0db8zob.cloudfront.net"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
