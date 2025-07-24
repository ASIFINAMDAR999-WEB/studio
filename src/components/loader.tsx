
export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background animate-fade-out [animation-delay:1.5s] [animation-fill-mode:forwards]">
      <div className="relative flex items-center justify-center h-24 w-24">
        <div className="absolute h-full w-full rounded-full border-4 border-primary/20 animate-spin-slow"></div>
        <div className="absolute h-full w-full rounded-full border-t-4 border-t-primary animate-spin-fast"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary animate-pulse-glow">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
    </div>
  );
}
