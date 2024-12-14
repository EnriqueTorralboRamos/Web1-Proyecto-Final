export default function SkeletonPermissionCheck() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center animate-pulse">
          <div className="h-12 w-12 rounded-full bg-gray-300 mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-36 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  