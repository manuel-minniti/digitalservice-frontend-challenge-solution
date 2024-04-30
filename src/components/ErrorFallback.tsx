interface IErrorFallback {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: IErrorFallback) {
  return (
    <div className="bg-red-100 rounded-lg p-16 text-red-700" role="alert">
      <div className="mb-8">
        <p className="ds-label-03-reg mb-4">
          Ein Fehler ist aufgetreten! Bitte versuchen Sie es später noch einmal.
          Wir entschuldigen uns hierfür.
        </p>
        <pre className="ds-body-02-reg">{error.message}</pre>
      </div>
      <button
        className="ds-button ds-button-small"
        onClick={resetErrorBoundary}
      >
        Nochmal versuchen
      </button>
    </div>
  )
}
