import Link from "next/link";
import { PawPrint } from "lucide-react";
import { BoxIcon } from "lucide-react";

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-12 bg-second border-t border-white/30">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link href="#" className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-accent">
            <BoxIcon size={24} />
            <h1 className="uppercase tracking-tight font-bold text-2xl">
              overwatch
            </h1>
          </div>
        </Link>
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} CodeKitten. All rights reserved.
        </div>
        <div className="flex gap-6">
          {footerLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-slate-400 hover:text-blue-500 transition-colors text-sm font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
