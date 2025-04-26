"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import { Advocate } from "./utilities/types";
import {
  constructUrl,
  fetcher,
} from "./utilities/methods";
import SearchBar from "./components/SearchBar";
import { Loading } from "./components/Loading";
import { NoResultsFound } from "./components/NoResultsFound";
import { Error } from "./components/Error";
import { Advocates } from "./components/Advocates";

export default function Home() {
  const searchInputRef =
    useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [yPosition, setYPosition] =
    useState<number>(0);

  const [allAdvocates, setAllAdvocates] =
    useState<Advocate[]>([]);

  const { data, error, isLoading, mutate } =
    useSWR<Advocate[] | string>(
      constructUrl(
        searchInputRef.current?.value ?? "",
        page,
      ),
      fetcher,
    );

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      window.scrollTo(0, yPosition);
      setAllAdvocates((prev) =>
        page === 1 ? data : [...prev, ...data],
      );
    }
  }, [data, page, yPosition]);

  const handleInputChange = () => {
    if (searchInputRef.current) {
      mutate(
        constructUrl(
          searchInputRef.current.value,
        ),
        true,
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;
      const scrollTop =
        document.documentElement.scrollTop;
      const clientHeight =
        document.documentElement.clientHeight;
      const scrollHeight =
        document.documentElement.scrollHeight;
      if (
        scrollTop + clientHeight >=
          scrollHeight - 50 &&
        data &&
        data.length ===
          Number(
            process.env.NEXT_PUBLIC_MAX_ADVOCATES,
          )
      ) {
        setPage((prev) => prev + 1);
        setYPosition(window.pageYOffset);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
    );
    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
  }, [data, isLoading]);

  return (
    <main className="m-6">
      <h1>Solace Advocates</h1>
      <SearchBar
        ref={searchInputRef}
        onInputChange={handleInputChange}
        onReset={() => {
          if (searchInputRef.current) {
            searchInputRef.current.value = "";
            mutate(constructUrl(""), true);
          }
        }}
      />
      {error && <Error />}
      {Array.isArray(data) && data.length > 0 ? (
        <Advocates data={allAdvocates} />
      ) : error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        !error && <NoResultsFound />
      )}
    </main>
  );
}
