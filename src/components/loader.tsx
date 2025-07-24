
export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background animate-fade-out [animation-delay:1.5s] [animation-fill-mode:forwards]">
      <div className="relative flex items-center justify-center h-24 w-24">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-14 w-14 text-primary"
        >
          <defs>
            <clipPath id="shield-clip">
              <rect className="animate-fill-up" x="0" y="0" width="24" height="24" />
            </clipPath>
          </defs>
          {/* Background Outline */}
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-primary/30"
          />
           <path 
            d="M12 2L12 22"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-primary/30"
           />
          {/* Animated Fill */}
          <g clipPath="url(#shield-clip)">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              fill="currentColor"
            />
            <path 
              d="M12 2L12 22"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="currentColor"
             />
          </g>
        </svg>
      </div>
    </div>
  );
}
