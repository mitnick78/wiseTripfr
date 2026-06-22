import { cn } from "@/lib/utils/cn";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded-xl", className)} />
  );
}
