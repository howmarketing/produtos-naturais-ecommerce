import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  //carregando a primeira loja disponível com o usuário que esta logando
  const store = await prismadb.store.findFirst({
    where: { userId },
  });

  // se a loja existir, vamos redirecionar para o id dela
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
