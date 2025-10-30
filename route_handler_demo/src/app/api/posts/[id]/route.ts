import { POSTS_API_URL } from "@/lib/apis";
import { Post } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
};

function jsonResponse<T>(
  data: Partial<ApiResponse<T>>, // ✅ data peut contenir data, message, etc.
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: data.success ?? true,
      ...data,
    } as ApiResponse<T>,
    { status }
  );
}

/*  Fonction utilitaire pour gérer les erreurs */
function handleError<T>(
  error: unknown,
  message = "Erreur serveur"
): NextResponse<ApiResponse<T>> {
  console.error(`[API ERROR]: ${message}`, error);
  return jsonResponse<T>({ success: false, error: message }, 500);
}

/**
 * ==================================================
 * 🟩 GET - Récupérer un post par ID
 * ==================================================
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const { id } = await params;
    const response = await fetch(`${POSTS_API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return jsonResponse<Post>(
        { success: false, error: "Post non trouvé" },
        404
      );
    }

    const data: Post = await response.json();
    return jsonResponse<Post>({ data });
  } catch (error) {
    return handleError<Post>(error, "Erreur lors de la récupération du post");
  }
}

/**
 * ==================================================
 * 🟨 PUT - Remplacer complètement un post
 * ==================================================
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const { id } = await params;
    const { title, body, userId } = await request.json();

    if (!title || !body || !userId) {
      return jsonResponse<Post>(
        { success: false, error: "title, body et userId sont requis" },
        400
      );
    }

    const response = await fetch(`${POSTS_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(id),
        title,
        body,
        userId: Number(userId),
      }),
    });

    if (!response.ok) throw new Error("Erreur lors du remplacement");

    const data: Post = await response.json();
    return jsonResponse<Post>({
      message: "Post remplacé avec succès",
      data,
    });
  } catch (error) {
    return handleError(error, "Erreur lors du remplacement du post");
  }
}

/**
 * ==================================================
 * 🟦 PATCH - Mise à jour partielle d’un post
 * ==================================================
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${POSTS_API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");

    const data: Post = await response.json();
    return jsonResponse<Post>({
      message: "Post mis à jour avec succès",
      data,
    });
  } catch (error) {
    return handleError(error, "Erreur lors de la mise à jour du post");
  }
}

/**
 * ==================================================
 * 🟥 DELETE - Supprimer un post
 * ==================================================
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = await params;

    const response = await fetch(`${POSTS_API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression");

    return jsonResponse<null>({
      message: "Post supprimé avec succès",
    });
  } catch (error) {
    return handleError(error, "Erreur lors de la suppression du post");
  }
}
