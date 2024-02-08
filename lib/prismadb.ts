import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

// quando usar o globalThis?
// se estivermos em development, vamos usar o globalThis.prisma
// o que nos ajuda a nao ficar iniciando um client primas toda hora
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;