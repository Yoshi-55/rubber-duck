import { Link } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
}

export default function EmptyState({
  title = "データがありません",
  description,
  actionText,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-gray-700 font-semibold">{title}</p>
      {description && <p className="mt-2 text-gray-500">{description}</p>}
      {actionText && actionLink && (
        <Link to={actionLink}>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            {actionText}
          </button>
        </Link>
      )}
    </div>
  );
}
