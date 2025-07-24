
export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background animate-fade-out [animation-delay:1.5s] [animation-fill-mode:forwards]">
      <div className="relative flex items-center justify-center h-24 w-24">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-16 w-16 text-primary"
        >
          <g className="animate-glow-pulse [animation-delay:1s]">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              className="stroke-primary fill-none stroke-[1.5] animate-trace [animation-fill-mode:forwards]"
              style={{ strokeDasharray: 60, strokeDashoffset: 60 }}
            />
            <path
              d="M12 2L12 22"
              className="stroke-primary fill-none stroke-[1.5] animate-trace [animation-fill-mode:forwards] [animation-delay:0.5s]"
              style={{ strokeDasharray: 21, strokeDashoffset: 21 }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
