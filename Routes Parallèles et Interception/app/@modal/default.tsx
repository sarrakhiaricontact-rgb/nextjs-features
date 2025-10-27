"use client";
import { useEffect } from "react";

export default function DefaultModal() {
  useEffect(() => {
    console.log("💡 DefaultModal monté");
    return () => console.log("🧹 DefaultModal démonté");
  }, []);
  // Ce fichier est OBLIGATOIRE pour les Parallel Routes
  // Il définit ce qui est rendu quand le slot @modal n'a pas de contenu
  return null;
}
