import "./globals.css";

export const metadata = {
  title: "Sushmit Energy - Clean and Sustainable Renewable Energy",
  description:
    "Sushmit Energy Pvt. Ltd is a leading hydropower project development company in Nepal, working on 93+ MW hydro projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
