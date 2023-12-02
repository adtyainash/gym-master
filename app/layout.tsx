// layout.tsx
import "./globals.css";

import FooterGym from "./components/FooterGym";
import Header from "./components/header";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Provider from "./components/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GymMaster",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`bg-base-100 ${inter.className}`}> 
        <Provider>
        <Header />
        <main className="min-h-screen w-full">{children}</main>
        <FooterGym />
        <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
