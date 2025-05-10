"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}
export const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary text-black border-transparent px-3.5 text-lg ",
        isActive && "bg-black text-white hover:text-white hover:bg-black "
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home", isActive: true },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];
export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="h-20 flex border-b font-medium  justify-between text-white">
      <Link href={"/"} className="pl-6 text-black flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Groova
        </span>
      </Link>
      <NavbarSidebar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          asChild
          className="border-0 border-l px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          variant={"secondary"}
        >
          <Link href={"/log-in"}>Log in</Link>
        </Button>

        <Button className="border-0 border-l px-12 h-full rounded-none bg-black text-white hover:text-black hover:bg-pink-400 transition-colors text-lg">
          <Link href={"/admin"}>Admin</Link>
          {/* <Link href={"/sign-up"}>Start Selling</Link> */}
        </Button>
      </div>
      <div className="flex items-center lg:hidden justify-center">
        <Button
          variant={"ghost"}
          className="!size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

// Navbar Sidebar Items
interface Props {
  items: NavbarItemProps[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, isOpen, onOpenChange }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className=" flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href={"/sign-in"}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Sign In
            </Link>
            <Link
              href={"/sign-up"}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Sign Up
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

// Footer
export const Footer = () => {
  return (
    <footer className="h-20 e flex justify-between font-semibold p-6 border-t">
      <div className="flex items-center gap-2">
        <p> © 2023 Groova. All rights reserved.</p>
      </div>
    </footer>
  );
};
