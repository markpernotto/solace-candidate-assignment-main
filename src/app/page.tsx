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
      <br />
      <br />
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
      <br />
      <br />
      {error && <Error />}
      {Array.isArray(data) && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((advocate: Advocate) => {
              return (
                <tr key={advocate.id}>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    {advocate.specialties.map(
                      (s, i) => (
                        <div key={i}>{s}</div>
                      ),
                    )}
                  </td>
                  <td>
                    {advocate.yearsOfExperience}
                  </td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : isLoading ? (
        <Loading />
      ) : (
        !error && <NoResultsFound />
      )}
    </main>
  );
}
