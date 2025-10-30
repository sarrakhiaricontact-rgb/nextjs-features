import { USERS_API_URL } from "@/lib/apis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(USERS_API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
