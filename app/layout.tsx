import Navbar from "@/components/navbar";
import "./globals.css";
import { getAuth } from "@/lib/getAuth";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getAuth()
  return (
    <html lang="fa" dir="rtl">
      <body cz-shortcut-listen="true" className="font-vazirmatn max-w-[1800px] mx-auto px-4 md:px-8">
        <Navbar isLoggedIn={!!user?.phone} />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
