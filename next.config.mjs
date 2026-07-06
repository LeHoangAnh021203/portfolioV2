/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "img.icons8.com"
      },
      {
        protocol: "https",
        hostname: "d3njjcbhbojbot.cloudfront.net"
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com"
      },
      {
        protocol: "https",
        hostname: "media.licdn.com"
      },
      {
        protocol: "https",
        hostname: "cdn.freecodecamp.org"
      }
    ]
  }
};

export default nextConfig;
