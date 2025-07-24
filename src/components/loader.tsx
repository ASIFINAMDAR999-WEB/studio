
export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background animate-fade-out [animation-delay:1.5s] [animation-fill-mode:forwards]">
      <div className="relative flex items-center justify-center h-24 w-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary animate-pulse-glow">
            <path d="m12 2-7.5 4v5.5c0 5.1 6.2 9.4 7.5 10.5 1.3-1.1 7.5-5.4 7.5-10.5V6L12 2z"/>
        </svg>
      </div>
    </div>
  );
}
