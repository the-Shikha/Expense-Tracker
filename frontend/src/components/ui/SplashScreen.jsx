import { useEffect, useState } from 'react';

export function SplashScreen({ finishLoading }) {
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsAnimate(true), 100);
    
    
    const finishTimeout = setTimeout(() => finishLoading(), 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(finishTimeout);
    };
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-zinc-950 transition-all duration-700">
      <div className={`transition-all duration-1000 transform ${isAnimate ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`}>
        
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white text-center">
          Expense<span className="text-indigo-600">Tracker</span>
        </h1>

        
        <div className="mt-6 h-2 w-64 md:w-80 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden relative shadow-inner">
        
          <div className="absolute inset-y-0 left-0 bg-indigo-600 animate-water-fill rounded-full overflow-hidden">
            
          
            <svg 
              className="absolute inset-y-0 h-full w-[200%] animate-water-flow text-indigo-400 opacity-60" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,0 C300,30 600,-30 900,0 L1200,0 L1200,120 L0,120 Z" 
                fill="currentColor"
              />
            </svg>
            
          </div>
        </div>

        

      </div>
    </div>
  );
}