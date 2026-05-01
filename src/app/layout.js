/**
 * @file Creates the root layout for the application, including global styles and fonts, and defines the structure of the page with a header, main content area, and footer.
 * @module app/layout.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../clientComponents/header.js";
import Footer from "../clientComponents/footer.js";

const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ["600"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "WT Assignment",
  description: "Dashboard for the WT Assignment",
};


/**
 * Component to display the root layout for the application, including global styles and fonts, and defines the structure of the page with a header, main content area, and footer.
 *
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
