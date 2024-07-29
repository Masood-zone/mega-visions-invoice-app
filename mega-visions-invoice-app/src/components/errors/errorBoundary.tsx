import React from "react";
import { ErrorBoundary } from "react-error-boundary";
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="w-auto h-52 overflow-hidden items-center justify-center mx-5 my-10">
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </button>
    </div>
  );
}

function MainErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

export default MainErrorBoundary;
