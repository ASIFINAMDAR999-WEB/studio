
export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background animate-fade-out [animation-delay:1.5s] [animation-fill-mode:forwards]">
      <div className="relative flex items-center justify-center h-24 w-24">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-16 w-16 text-primary animate-scale-in-x opacity-0 [--scale-delay:0s] [animation-fill-mode:forwards]"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
         <div className="absolute inset-0 flex items-center justify-center animate-glow-pulse [animation-delay:1s]">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 text-primary animate-scale-in-y opacity-0 [--scale-delay:0.2s] [animation-fill-mode:forwards]"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
