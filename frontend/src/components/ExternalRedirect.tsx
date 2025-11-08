import { useEffect } from "react";

/**
 * Instantly redirects the user to an external (non-React) page.
 * Shows a tiny message for a split second in case of slow networks.
 */
export default function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.assign(to);
  }, [to]);

  return (
    <div className="p-6 text-sm text-gray-600 dark:text-gray-300">
      Opening password reset…
    </div>
  );
}