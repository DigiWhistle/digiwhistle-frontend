import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./Providers";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", weight: "700" });

export const metadata: Metadata = {
  title: "Welcome to Digiwhistle",
  description: "Influencer Management Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${raleway.variable} font-sans flex flex-col w-full h-full `}
      >
        <ReduxProvider>
          <Providers>{children}</Providers>
        </ReduxProvider>
        <Toaster position="top-center" expand={true} richColors theme="light" />
      </body>
    </html>
  );
}
