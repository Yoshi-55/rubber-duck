interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div>
      <p>エラー: {message}</p>
      {onRetry && <button onClick={onRetry}>再試行</button>}
    </div>
  );
}
