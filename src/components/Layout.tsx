import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Layout({
  children,
  date,
}: {
  children: React.ReactNode;
  date?: string;
}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header date={date} />
        <div className="grow">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
