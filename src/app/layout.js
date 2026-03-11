import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MuiProvider from "@/configs/MuiProvider";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "Overwatch Heroes",
  description: "overwatch heroes info and ability",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <MuiProvider>
          <Navbar />
          <div className="bg-primary">{children}</div>
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}
