import useSWR from "swr";
import { Fetcher } from "types/prayer-types";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useFetcher = <T>(url: string): Fetcher<T> => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
