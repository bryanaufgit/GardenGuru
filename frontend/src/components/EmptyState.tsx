type Props = {
  message?: string;
};

export default function EmptyState({ message = "Keine Einträge gefunden." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-gray-500 max-w-xl mx-auto text-center">
      <span className="mb-2">{message}</span>
    </div>
  );
}