import { COMMENTS_API_URL } from "@/lib/apis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");
    const limit = searchParams.get("limit");

    let url = COMMENTS_API_URL;
    const params = new URLSearchParams();

    if (postId) params.append("postId", postId);
    if (limit) params.append("_limit", limit);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des commentaires");
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
