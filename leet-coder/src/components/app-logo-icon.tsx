import Image from "next/image";

export default function AppLogoIcon({ className, width = 50, height = 50 }: Readonly<{ className: string, width?: number, height?: number }>) {
    return <Image
        src={"/logo.svg"}
        alt="Logo"
        width={width}
        height={height}
        className={className}
    />;
}
