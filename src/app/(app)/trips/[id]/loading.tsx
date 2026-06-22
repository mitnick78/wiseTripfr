export default function TripDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <div className="h-4 w-24 bg-stone-200 rounded" />
        <div className="h-4 w-4 bg-stone-100 rounded" />
        <div className="h-4 w-32 bg-stone-200 rounded" />
      </div>

      {/* Header card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-7 w-56 bg-stone-200 rounded-lg" />
              <div className="h-6 w-20 bg-stone-100 rounded-full" />
            </div>
            <div className="flex items-center gap-5">
              <div className="h-4 w-28 bg-stone-100 rounded" />
              <div className="h-4 w-40 bg-stone-100 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-stone-100 rounded-xl" />
            <div className="h-9 w-28 bg-stone-100 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="h-10 w-52 bg-stone-100 rounded-xl mb-6" />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-stone-200 rounded-2xl p-4"
          >
            <div className="h-5 w-20 bg-stone-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-16 bg-stone-100 rounded-xl" />
              <div className="h-16 bg-stone-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
