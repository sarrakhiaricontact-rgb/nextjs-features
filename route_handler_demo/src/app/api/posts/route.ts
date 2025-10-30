import { POSTS_API_URL } from "@/lib/apis";
import { NextRequest, NextResponse } from "next/server";

// ============================================
// GET - Récupérer tous les posts ou filtrer
// ============================================
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const limit = searchParams.get("limit");

    let url = POSTS_API_URL;
    const params = new URLSearchParams();

    if (userId) params.append("userId", userId);
    if (limit) params.append("_limit", limit);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      cache: "no-store", // Pour avoir toujours les données fraîches
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des posts");
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des posts",
      },
      { status: 500 }
    );
  }
}

// ============================================
// POST - Créer un nouveau post
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: postBody, userId } = body;

    // Validation
    if (!title || !postBody || !userId) {
      return NextResponse.json(
        {
          success: false,
          error: "title, body et userId sont requis",
        },
        { status: 400 }
      );
    }

    // JSONPlaceholder simule la création mais ne stocke pas réellement
    const response = await fetch(POSTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body: postBody,
        userId: parseInt(userId),
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du post");
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: "Post créé avec succès",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la création du post",
      },
      { status: 500 }
    );
  }
}

// ============================================
// HEAD - Obtenir les métadonnées
// ============================================
export async function HEAD(request: NextRequest) {
  try {
    const response = await fetch(POSTS_API_URL);
    const data = await response.json();

    return new NextResponse(null, {
      status: 200,
      headers: {
        "X-Total-Posts": data.length.toString(),
        "X-API-Version": "1.0",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

// ============================================
// OPTIONS - Méthodes disponibles
// ============================================
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "GET, POST, HEAD, OPTIONS",
      "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
