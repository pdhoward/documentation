import type { NextConfig } from "next";

const nextConfig: NextConfig = {    
   devIndicators: false,
   logging: {
      incomingRequests: process.env.NODE_ENV === "production" ? false : true,
   },
   compiler: {
      removeConsole: process.env.NODE_ENV === "production"
    },
  reactStrictMode: true,
     images: {     
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",          
          pathname: "/stratmachine/**",
        },       
      ],    
  },
   allowedDevOrigins: [
    "localhost:3000",       
    "chaotic.ngrok.io",    
    "local-origin.dev",
    "*.local-origin.dev",
  ],
};

export default nextConfig;
