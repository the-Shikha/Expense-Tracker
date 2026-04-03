export function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
        hover
          ? 'transition-all duration-200 hover:shadow-md hover:border-gray-300'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}