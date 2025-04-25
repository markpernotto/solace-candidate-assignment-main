"use client";

import { useRef } from "react";
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

  const { data, error, isLoading, mutate } =
    useSWR<Advocate[] | string>(
      constructUrl(
        searchInputRef.current?.value ?? "",
      ),
      fetcher,
    );

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
        <Advocates data={data} />
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
