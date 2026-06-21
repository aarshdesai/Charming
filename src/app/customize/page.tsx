import type { Metadata } from "next";
import { CharmCustomizer } from "@/components/customizer/CharmCustomizer";

export const metadata: Metadata = {
  title: "Design Yours — Charming Sacramento",
  description: "Drag and drop charms onto your chain, bracelet, or anklet.",
};

export default function CustomizePage() {
  return <CharmCustomizer />;
}
