# LM Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Authentication Setup

This project uses [Clerk](https://clerk.com) for authentication. To set up authentication:

1. Create a Clerk account and set up your application
2. Add the following environment variables to your `.env.local` file:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/editar
```

## Convex Setup

This project uses [Convex](https://convex.dev) as the backend. To set up Convex:

1. Create a Convex account and set up your project
2. Add the following environment variable to your `.env.local` file:

```bash
# App URL (SEO)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Public Route**: `/` - Home page (public)
- **Protected Route**: `/editar` - Admin panel (requires authentication)
- **Auth Route**: `/sign-in` - Sign-in page (sign-ups are disabled)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Environment Variables for Vercel

Make sure to add the following environment variables in your Vercel project settings:

```bash
# App URL (SEO)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/editar

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

### Build Process

The build process automatically generates Convex types using `convex codegen` before building the Next.js application. This ensures that the `_generated/api` module is available during the build.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SEO Setup

- Set `NEXT_PUBLIC_APP_URL` to your production origin, e.g. `https://your-domain.com`.
- Dynamic Open Graph image is generated from the Hero photo at `app/opengraph-image.tsx`.
- Robots and sitemap are available at `/robots.txt` and `/sitemap.xml`.
- Web app manifest is served from `/manifest.webmanifest`.
