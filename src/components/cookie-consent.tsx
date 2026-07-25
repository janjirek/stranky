import { useEffect, useState } from 'react';

declare global {
  interface Window {
    loadGoogleAnalytics?: () => void;
  }
}

const CONSENT_KEY = 'cookie-consent';

export default function CookieConsent({ children }: React.PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    window.loadGoogleAnalytics?.();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tento web používá cookies pro měření návštěvnosti (Google Analytics). Kliknutím na
          &bdquo;Přijmout&ldquo; s tím souhlasíte.{' '}
          {children ? <span className="inline-block">{children}</span> : null}
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={decline}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
