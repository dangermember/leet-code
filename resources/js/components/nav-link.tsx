import { Link } from '@inertiajs/react';
import type { ComponentProps, ReactNode } from 'react';

type MenuLink = {
    href: ComponentProps<typeof Link>['href'];
    children: ReactNode;
    external?: boolean;
    className?: string;
    onClick?: () => void;
};

export function NavLink({
    href,
    children,
    external,
    className,
    onClick
}: Readonly<MenuLink>) {
    if (external) {
        return (
            <a onClick={() => onClick?.()} className={className} href={String(href)} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return <Link onClick={() => onClick?.()} className={className} href={href}>{children}</Link>;
}