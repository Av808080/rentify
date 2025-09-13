import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body cz-shortcut-listen="true" className="font-vazirmatn">
        {children}
      </body>
    </html>
  );
}
