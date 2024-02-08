"use client"

import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
   // como vou add o componente dentro de um server component (layout no app) 
   // preciso me certificar de que não haverá nenhuma dehydration com os modais
   
    const [isMounted, setIsMounted] = useState(false);

    // me certifico de que até que esse life-cycle tenha rodado
    // ele retorne null
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
        <StoreModal/>
        </>
    )
}