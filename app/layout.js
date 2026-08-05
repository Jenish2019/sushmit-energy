import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Sushmit Energy - Clean and Sustainable Renewable Energy",
  description:
    "Sushmit Energy Pvt. Ltd is a leading hydropower project development company in Nepal, working on 93+ MW hydro projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
