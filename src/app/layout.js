import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./provider/providers";

const montserrat_mono = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "400", "500"],
  variable: "--font-montserrat-mono",
});

export const metadata = {
  title: "Prueba técnica",
  description: "Prueba técnica UPCH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat_mono.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
