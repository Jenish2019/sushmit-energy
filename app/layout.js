import "./globals.css";

export const metadata = {
  title: "Sushmit Energy - Clean and sustainable renewable energy.",
  description: "Sushmit Energy Pvt. Ltd is a leading hydropower project development company.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Hammersmith+One" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}