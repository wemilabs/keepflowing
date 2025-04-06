import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen pt-24 md:pt-36">
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 md:gap-y-10 text-center">
          <div className="flex flex-col gap-2 text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            <h1 className="dark:text-white/80">
              Managing projects shouldn't be a chore.
            </h1>
            <h1 className="bg-gradient-to-r from-primary/10 via-primary to-primary/65 bg-clip-text text-transparent">
              Stay in the flow.
            </h1>
          </div>
          <h2 className="max-w-[750px] text-muted-foreground md:text-lg">
            Rediscover managing projects like never before.
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 px-6 has-[>svg]:px-4 bg-primary hover:bg-primary/90 text-muted"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
