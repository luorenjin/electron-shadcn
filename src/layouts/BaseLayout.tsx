import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/template/NavigationMenu";
import Footer from "@/components/template/Footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <DragWindowRegion title="DeepData" />
      <div className="flex flex-1 overflow-hidden">
        <NavigationMenu />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
