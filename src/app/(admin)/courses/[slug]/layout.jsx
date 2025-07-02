"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CourseLayout({ children, params, }) {
    const pathname = usePathname();
    const { slug } = params;
    const navLinks = [
        { href: `/courses/${slug}/content`, label: "Content" },
        { href: `/courses/${slug}/students`, label: "Students" },
        { href: `/courses/${slug}/analytics`, label: "Analytics" },
    ];
    return (<div>
      <div className="mb-6 border-b">
        <nav className="flex space-x-6">
          {navLinks.map((link) => (<Link key={link.href} href={link.href} className={`pb-4 px-1 border-b-2 ${pathname === link.href
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              {link.label}
            </Link>))}
        </nav>
      </div>
      {children}
    </div>);
}
