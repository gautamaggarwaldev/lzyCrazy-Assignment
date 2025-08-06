"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HandHeart, Search, Tag, Building, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }
    router.push(`/?${newParams.toString()}`);
  };

  const navItems = [
    { href: "/favorites", icon: <HandHeart className="mr-2 h-5 w-5"/>, label: "Favorites" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-4">
          <Building className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline tracking-tight">LzyCrazy</span>
        </Link>

        {pathname === '/' && (
          <div className="hidden md:flex flex-1 max-w-lg items-center gap-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search for cars, furniture, and more..."
                  className="w-full pl-10"
                  defaultValue={searchParams.get("q") ?? ""}
                />
              </div>
            </form>
          </div>
        )}
        <div className="flex-1 md:hidden"></div>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
          <Button asChild>
            <Link href="/sell"><Tag className="mr-2 h-5 w-5"/>Start Selling</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Building className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold font-headline">LzyCrazy</span>
                </Link>
                {pathname === '/' && (
                  <form onSubmit={handleSearch} className="w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="search"
                        name="search"
                        placeholder="Search..."
                        className="w-full pl-10"
                        defaultValue={searchParams.get("q") ?? ""}
                      />
                    </div>
                  </form>
                )}
                {navItems.map((item) => (
                  <Button key={item.href} variant="ghost" className="justify-start" asChild>
                    <Link href={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                ))}
                <Button asChild>
                  <Link href="/sell"><Tag className="mr-2 h-5 w-5"/>Start Selling</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
