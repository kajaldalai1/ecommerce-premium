import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-md" />
            ))}
        </div>
      </div>

      <div className="flex flex-col">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-8 w-24 mb-6" />

        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <Skeleton className="h-6 w-24 mb-3" />
        <div className="flex gap-3 mb-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
        </div>

        <Skeleton className="h-6 w-24 mb-3" />
        <div className="flex gap-3 mb-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded-md" />
            ))}
        </div>

        <div className="flex gap-4 mt-6">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  )
}
