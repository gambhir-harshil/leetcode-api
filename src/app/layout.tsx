import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "@/context/authContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nothing to FAANG.space",
  description: "From Nothing To FAANG Space Leetcode Game App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ToastContainer />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
