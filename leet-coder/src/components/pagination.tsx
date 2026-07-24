import Link from "next/link";

interface PaginationProps {
    page: number;
    totalPages: number;
    pathname: string;
    searchParams?: Record<string, string | string[] | undefined>;
    className?: string;
}

export default function Pagination({
    page,
    totalPages,
    pathname,
    searchParams = {},
    className = ""
}: Readonly<PaginationProps>) {
    if (totalPages <= 1) {
        return null;
    }

    const createHref = (newPage: number) => {
        const params = new URLSearchParams();

        Object.entries(searchParams).forEach(([key, value]) => {
            if (key === "page" || value == null) {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else {
                params.set(key, value);
            }
        });

        params.set("page", newPage.toString());

        return `${pathname}?${params.toString()}`;
    };

    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        if (page > 3) {
            pages.push("...");
        }

        for (
            let i = Math.max(2, page - 1);
            i <= Math.min(totalPages - 1, page + 1);
            i++
        ) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    return (
        <nav
            aria-label="Pagination"
            className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
        >
            <Link
                href={createHref(Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={`rounded border px-3 py-2 text-sm transition hover:bg-muted hover:text-black ${page === 1 && "pointer-events-none opacity-50"}`}
            >
                Previous
            </Link>

            {pages.map((item, index) =>
                item === "..." ? (
                    <span
                        key={"ellipsis-" + index}
                        className="px-2 text-muted-foreground"
                    >
                        ...
                    </span>
                ) : (
                    <Link
                        key={item}
                        href={createHref(item)}
                        aria-current={item === page ? "page" : undefined}
                        className={`rounded border px-3 py-2 text-sm transition hover:bg-muted hover:text-black ${item === page && "bg-secondary text-primary"}`}
                    >
                        {item}
                    </Link>
                )
            )}

            <Link
                href={createHref(Math.min(totalPages, page + 1))}
                aria-disabled={page === totalPages}
                className={`rounded border px-3 py-2 text-sm transition hover:bg-muted hover:text-black ${page === totalPages && "pointer-events-none opacity-50"}`}
            >
                Next
            </Link>
        </nav>
    );
}