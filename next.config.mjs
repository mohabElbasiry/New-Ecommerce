/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
       
        {
          protocol: "http",
          hostname: "localhost",
          pathname: "**",
        }, 
      ],
    },
    async rewrites() {
        return [
          {
            source: '/api/v1/:path*',
            destination: 'http://localhost:3001/:path*',
          },
        ]
      },
    
    transpilePackages: ["@pqina/pintura", "@pqina/react-pintura"],
};

export default nextConfig;
