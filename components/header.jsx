"use client";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { NAV_LINKS } from "@/lib/landing";

function NavigationLinks() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium hover:text-teal-500 transition"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

function AuthSection() {
  return (
    <div className="flex items-center gap-4">
      <Authenticated>
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="hidden md:inline-flex items-center gap-2 hover:text-teal-600 hover:border-teal-600 transition"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="hidden w-10 h-10 p-0">
            <LayoutDashboard className="h-4 w-4" />
          </Button>
        </Link>
        <UserButton />
      </Authenticated>
      <Unauthenticated>
        <SignInButton>
          <Button variant="ghost">Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button className="bg-orange-500 hover:bg-orange-600 border-none">
            Get Started
          </Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}

const Header = () => {
  const { isLoading } = useStoreUser();
  const currentPath = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <section className="w-full mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            priority
            src="/logos/logo.png"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
            alt="splitzy-logo"
          />
        </Link>
        {currentPath === "/" && <NavigationLinks />}
        <AuthSection />
      </section>
      {isLoading && <BarLoader width="100%" color="#36d7b7" />}
    </header>
  );
};

export default Header;
