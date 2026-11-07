import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Tanji Akhter Jhumur | Care with kindness",
  description: "Meet Tanji Akhter Jhumur, a visionist and patient attendant in Dhaka. Explore her work in vision testing, blood pressure checks, and patient care.",
  openGraph: {
    title: "Tanji Akhter Jhumur | Care with kindness",
    description: "A little kindness. A clearer world. Patient care, eye health, and human connection.",
    images: [{ url: "/images/jhumur-hero.png", alt: "Tanji Akhter Jhumur" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Tanji Akhter Jhumur | Care with kindness", images: ["/images/jhumur-hero.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><noscript><style>{`.reveal,.word,.hero-enter{opacity:1!important;transform:none!important}`}</style></noscript>{children}</body>
    </html>
  );
}
