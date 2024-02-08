"use client";

import { columns } from "./columns";
import { OrderColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface IOrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: IOrderClientProps) => {

  return (
    <>
      <Heading
        title={`Pedidos (${data.length})`}
        description="Gerencie pedidos para sua loja."
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
