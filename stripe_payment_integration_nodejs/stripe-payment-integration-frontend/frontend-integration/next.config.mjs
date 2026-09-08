// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
  
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     dangerouslyAllowSVG: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
