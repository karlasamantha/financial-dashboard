import { useEffect, useState } from 'react';

export function useSessionStatus() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn))
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  return { loggedIn, loading };
}
