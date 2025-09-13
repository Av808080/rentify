import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body cz-shortcut-listen="true" className="font-vazirmatn max-w-[1800px] mx-auto">
        {children}
      </body>
    </html>
  );
}
