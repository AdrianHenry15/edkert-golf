import Image from "next/image";
import React from "react";
import Link from "next/link";

import { ProductType } from "@/lib/types";
import { getProductBrandImage } from "@/lib/products/helpers/get-product-brand-image";

interface ProductItemProps {
    product: ProductType;
}

const ProductItem = (props: ProductItemProps) => {
    // Props
    const { product } = props;

    return (
        <Link
            href={`/products/${product.id}`}
            className="relative items-center justify-center flex flex-col px-12 flex-shrink-0 w-[400px] h-[280px] rounded-md border-white "
        >
            <div className="flex w-[300px] min-h-[170px] relative hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                    className="object-cover opacity-75 flex rounded-md w-full h-full"
                    width={400}
                    height={400}
                    src={product.image}
                    alt={product.name}
                />
                <Image
                    src={getProductBrandImage(product.brand)}
                    alt="brand-logo"
                    className="flex absolute left-2 bottom-2 w-16 sm:w-24"
                />
            </div>
            {/* PRODUCT TAB */}
            <div className="flex flex-col bottom-0 items-start p-1 text-xs w-full rounded-full whitespace-nowrap">
                <p className="flex text-black font-semibold mr-2 ml-1">{product.name}</p>
                <p className="flex text-zinc-400 font-semibold mr-2 ml-1">{product.description}</p>
            </div>
        </Link>
    );
};

export default ProductItem;
