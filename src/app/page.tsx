"use client";

import { useState, useRef } from "react";
import useSWR from "swr";
import { Advocate } from "./utilities/types";
import { fetcher } from "./utilities/methods";

export default function Home() {
  const [searchTerm, setSearchTerm] =
    useState("");
  const searchInputRef =
    useRef<HTMLInputElement>(null);

  const { data, error, isLoading } = useSWR<
    Advocate[]
  >(() => {
    return `http://localhost:3000/api/advocates${
      searchTerm ? `?search=${searchTerm}` : ""
    }`;
  }, fetcher);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for:{" "}
          <span id="search-term"></span>
          <input
            type="text"
            placeholder="Search..."
            id="searchInput"
            ref={searchInputRef}
            style={{ border: "1px solid black" }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </p>
        <button
          onClick={() => {
            setSearchTerm("");
            if (searchInputRef.current) {
              searchInputRef.current.value = "";
            }
          }}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      {error && <div>There is an error</div>}
      {data && data.length > 0 ? (
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
            {data?.map((advocate: Advocate) => {
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
        <div>Loading...</div>
      ) : (
        !error && <div>No Results Found</div>
      )}
    </main>
  );
}
