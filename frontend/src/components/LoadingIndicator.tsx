export default function LoadingIndicator({ message = "🌱 Lade Pflanzen..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-8 px-4 text-gray-500">
      <span className="animate-pulse" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}