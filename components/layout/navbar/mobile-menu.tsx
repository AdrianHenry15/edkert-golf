"use client";

import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion components

import { NavMenu } from "../../../lib/constants";
import { FaPhone } from "react-icons/fa6";
import Button from "@/components/button";
import { BiChevronDown } from "react-icons/bi";
import ProductsNavMenu from "./products-nav-menu";

export default function MobileMenu() {
    // Constants
    const pathname = usePathname();

    // State
    const [isOpen, setIsOpen] = useState(false);
    const openMobileMenu = () => setIsOpen(true);
    const closeMobileMenu = () => setIsOpen(false);
    const [productsMenuOpen, setProductsMenuOpen] = useState(false);

    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);

    // Renders
    const renderNavMenu = () => {
        return NavMenu.map((item) => {
            if (item.title === "Products") {
                return (
                    <div key={item.title} className="relative cursor-pointer">
                        <span
                            key={item.title}
                            onClick={(e) => {
                                e.preventDefault();
                                setProductsMenuOpen(!productsMenuOpen);
                            }}
                            className={`${
                                pathname === item.link ? "underline" : ""
                            } flex items-center hover:text-neutral-500 ease-in-out duration-300`}
                        >
                            <li className={`py-4 text-xl text-black transition-colors`}>
                                {item.title}
                            </li>
                            <BiChevronDown className="text-black" size={20} />
                        </span>
                        {productsMenuOpen && (
                            <ProductsNavMenu
                                setProductsMenuOpen={() => setProductsMenuOpen(false)}
                            />
                        )}
                    </div>
                );
            } else {
                return (
                    <Link
                        key={item.title}
                        href={item.link}
                        onClick={closeMobileMenu}
                        className={`${pathname === item.link ? "underline" : ""}`}
                    >
                        <li
                            className={`py-4 text-xl text-black transition-colors hover:text-neutral-500`}
                        >
                            {item.title}
                        </li>
                    </Link>
                );
            }
        });
    };

    return (
        <div className="relative">
            <button
                onClick={openMobileMenu}
                aria-label="Open mobile menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors overflow-hidden"
            >
                <Bars3Icon className="h-6 text-black" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <Transition show={isOpen}>
                        <Dialog onClose={closeMobileMenu} className="relative z-[9050]">
                            <TransitionChild
                                as={Fragment}
                                enter="transition-opacity ease-in-out duration-100"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-in-out duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                            </TransitionChild>
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed bottom-0 right-0 top-0 flex h-full flex-col bg-white pb-6 w-full sm:w-[375px]"
                            >
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="flex h-11 w-11 items-center justify-center rounded-md text-black transition-colors"
                                            onClick={closeMobileMenu}
                                            aria-label="Close mobile menu"
                                        >
                                            <XMarkIcon className="h-6" />
                                        </button>
                                    </div>

                                    <ul className="flex w-full flex-col h-full">
                                        {renderNavMenu()}
                                    </ul>
                                </div>
                                {/* NAV BUTTONS */}
                                <ul className="bottom-0 fixed flex flex-col self-start w-full">
                                    {/* Phone */}
                                    <Link
                                        onClick={closeMobileMenu}
                                        className="w-full px-10 flex justify-start"
                                        href="tel:7048423535"
                                    >
                                        <Button
                                            leftChildren
                                            roundedFull
                                            className="mb-4 w-full py-4 flex justify-center sm:w-[300px]"
                                            name="704-842-3535"
                                            altColor
                                        >
                                            <FaPhone className="mr-2" />
                                        </Button>
                                    </Link>
                                    {/* Email */}
                                    <Link
                                        onClick={closeMobileMenu}
                                        className="w-full px-10 flex justify-start"
                                        href="mailto:frank.eckert@eckertgolf.com"
                                    >
                                        <Button
                                            leftChildren
                                            roundedFull
                                            className="mb-4 w-full py-4 flex justify-center sm:w-[300px]"
                                            name="frank.eckert@eckertgolf.com"
                                        >
                                            <FaPhone className="mr-2" />
                                        </Button>
                                    </Link>
                                </ul>
                            </motion.div>
                        </Dialog>
                    </Transition>
                )}
            </AnimatePresence>
        </div>
    );
}
