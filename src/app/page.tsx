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
import { AdvocateHeading } from "./components/AdvocateHeader";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchInputRef =
    useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [yPosition, setYPosition] =
    useState<number>(0);

  const [allAdvocates, setAllAdvocates] =
    useState<Advocate[]>([]);
  const existingSearchParam = useSearchParams();

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
        page === 1
          ? data
          : [...prev, ...data].reduce(
              (
                acc: Advocate[],
                current: Advocate,
              ) => {
                if (
                  !acc.some(
                    (advocate: Advocate) =>
                      advocate.id === current.id,
                  )
                ) {
                  acc.push(current);
                }
                return acc;
              },
              [] as Advocate[],
            ),
      );
    }
  }, [data, page, yPosition]);

  const handleInputChange = () => {
    if (searchInputRef.current) {
      const searchParam =
        existingSearchParam.get("search");

      if (searchParam === null) {
        setPage(1);
      }

      mutate(
        constructUrl(
          searchInputRef.current.value,
          searchParam ? page : 1,
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
        setYPosition(window.pageYOffset);
        setPage((prev) => prev + 1);
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

  const validAdvocates =
    Array.isArray(allAdvocates) &&
    allAdvocates.length > 0;

  return (
    <main>
      <div className="sticky top-0 bg-white w-full z-10 mt-2 px-6">
        <h1>Solace Advocates</h1>
        <SearchBar
          ref={searchInputRef}
          onInputChange={handleInputChange}
          onReset={() => {
            if (searchInputRef.current) {
              searchInputRef.current.value = "";
              mutate(constructUrl("", 1), true);
              setYPosition(0);
            }
          }}
        />
        {validAdvocates && <AdvocateHeading />}
      </div>
      <div className="mx-6 my-2">
        {error && <Error />}
        {validAdvocates ? (
          <Advocates data={allAdvocates} />
        ) : error ? (
          <Error />
        ) : isLoading ? (
          <Loading />
        ) : (
          !error && <NoResultsFound />
        )}
      </div>
    </main>
  );
}
