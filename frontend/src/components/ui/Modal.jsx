import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, className = "max-w-lg" }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = 'var(--removed-body-scrollbar-width)'; // Prevent layout shift
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      
      
      <div
        className="absolute inset-0 bg-gray-950/20 dark:bg-black/80 backdrop-blur-xl animate-in fade-in duration-700"
        onClick={onClose}
      />

     
      <div 
        className={`relative w-full ${className} bg-white dark:bg-zinc-950 
          rounded-[2.5rem] md:rounded-[3.5rem] 
          shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] 
          dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]
          border border-gray-100 dark:border-white/5 
          overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      >
        
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-100 dark:bg-white/5 rounded-b-3xl" />

        
        <div className="flex items-start justify-between px-8 md:px-12 pt-10 md:pt-14 pb-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500">
              System Interface
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-950 dark:text-white tracking-tighter uppercase">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="group p-3 bg-gray-50 dark:bg-white/5 hover:bg-rose-500/10 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-rose-500/20"
          >
            <X size={20} className="text-gray-400 group-hover:text-rose-500 transition-colors" strokeWidth={2.5} />
          </button>
        </div>

       
        <div className="px-8 md:px-12 pb-10 md:pb-14 max-h-[75vh] overflow-y-auto scrollbar-hide selection:bg-indigo-500/20">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150 fill-mode-both">
            {children}
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent" />
      </div>
    </div>
  );
}