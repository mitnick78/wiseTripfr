export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="h-8 w-48 bg-stone-200 rounded-lg mb-2" />
          <div className="h-4 w-32 bg-stone-100 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-stone-200 rounded-xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-stone-200 rounded-xl p-4"
          >
            <div className="w-8 h-8 bg-stone-100 rounded-lg mb-3" />
            <div className="h-6 w-12 bg-stone-200 rounded mb-1" />
            <div className="h-3 w-20 bg-stone-100 rounded" />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-stone-200 rounded-2xl overflow-hidden"
          >
            <div className="h-28 bg-stone-100" />
            <div className="p-4">
              <div className="h-5 w-40 bg-stone-200 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-3 w-28 bg-stone-100 rounded" />
                <div className="h-3 w-36 bg-stone-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
