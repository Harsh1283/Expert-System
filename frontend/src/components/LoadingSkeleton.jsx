const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-320px rounded-3xl bg-white border border-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;