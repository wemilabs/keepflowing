import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href, className }: LogoProps) {
  return (
    <Link href={href ?? "/"} className={`flex ${className}`}>
      <h1 className="text-2xl font-bold">
        keep
        <span className="bg-gradient-to-r from-primary/45 via-primary to-primary/65 bg-clip-text text-transparent">
          flowing
        </span>
      </h1>
    </Link>
  );
}
