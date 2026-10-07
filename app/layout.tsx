import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import "../styles/freight-workbench.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const description =
  "Applied data scientist building analytical systems from the data and model through to the decision interface.";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhayjuloori.github.io"),
  title: "Abhay Juloori — Applied Data Scientist",
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Abhay Juloori",
    title: "Abhay Juloori — Applied Data Scientist",
    description,
  },
  twitter: {
    card: "summary",
    title: "Abhay Juloori — Applied Data Scientist",
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
