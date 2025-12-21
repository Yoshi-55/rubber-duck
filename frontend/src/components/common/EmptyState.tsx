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
    <div>
      <p>{title}</p>
      {description && <p>{description}</p>}
      {actionText && actionLink && (
        <Link to={actionLink}>
          <button>{actionText}</button>
        </Link>
      )}
    </div>
  );
}
