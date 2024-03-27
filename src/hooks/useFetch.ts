import { useState } from 'react';

export function useFetch<T>(
  query: () => Promise<T>,
): [boolean, T | null, () => Promise<void>, boolean] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const response = await query();
    try {
      setData(response);
    } catch (e) {
      console.error(e);
      setError(true);
    }
    setLoading(false);
  };

  return [loading, data, fetch, error];
}
