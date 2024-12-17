import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";  // Import the 'Press Start 2P' font from next/font/google
import "./globals.css";

// Create a custom font variable for 'Press Start 2P'
const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p", // Custom variable for font
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Mantler Mind Mining",  // Set the title of your app
  description: "A game on Mantle L2 chain",  // Description of your app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} antialiased`}  // Apply the custom font variable to body
      >
        {children}
      </body>
    </html>
  );
}
