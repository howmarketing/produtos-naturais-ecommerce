"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { columns } from "./columns";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/ui/api-list";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";


interface IProductClientProps {
    data: ProductColumn[]
}

export const ProductClient = ({data}: IProductClientProps) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Produtos (${data.length})`}
                    description="Gerencie produtos para sua loja."
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Adicione um novo
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" description="Chamadas da API para os produtos"/>
            <Separator/>
            <ApiList entityName="products" entityIdName="productsId"/>
        </>
    )
}