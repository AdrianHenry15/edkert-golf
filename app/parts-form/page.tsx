import PartsForm from "@/components/parts-form/parts-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Parts & Services | EGS Equipment",
    description: "All of our parts and services on one page",
    icons: {
        icon: "/logos/placeholder.webp",
    },
};

export default function PartsServicesPage() {
    return (
        <div className="flex flex-col justify-center items-center relative w-full">
            <PartsForm />
        </div>
    );
}
