import Link from "next/link";

import { menuLinks } from "@/types/constants";

interface NavLinksProps {
    className: string;
    onNavigate?: () => void;
}

export function NavLinks({
    className,
    onNavigate,
}: Readonly<NavLinksProps>) {
    return (
        <>
            {menuLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={className}
                    onClick={onNavigate}
                >
                    {link.label}
                </Link>
            ))}
        </>
    );
}