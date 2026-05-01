import React from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router";

export function RouteError() {
  const error = useRouteError();

  let title = "Page not found";
  let message = "The page you tried to open does not exist or is unavailable.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    if (typeof error.data === "string" && error.data.trim()) {
      message = error.data;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
          <Link
            to="/home"
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
