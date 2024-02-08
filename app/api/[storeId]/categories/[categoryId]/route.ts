import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
  ) {
    try {
      if (!params.categoryId) {
        return new NextResponse("O ID da categoria é obrigatório.", { status: 400 });
      }

      const category = await prismadb.category.findUnique({
        where: {
          id: params.categoryId
        },
        include: {
          billboard: true
        }
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log("CATEGORY_GET", error);
      return new NextResponse("Erro interno", { status: 500 });
    }
};

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;


    if (!userId) {
      return new NextResponse("Não autenticado", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Nome é obrigatório.", { status: 400 });
    }

    if (!billboardId) {
        return new NextResponse("ID do billboard é obrigatório.", { status: 400 });
      }

    if (!params.categoryId) {
      return new NextResponse("O ID da categoria é obrigatório.", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId){
        return new NextResponse("Não autorizado", { status: 405 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_PATCH", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Não autenticado", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Categoria é obrigatório.", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId){
        return new NextResponse("Não autorizado", { status: 405 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_DELETE", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
};


