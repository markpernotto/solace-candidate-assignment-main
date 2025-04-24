"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] =
    useState("");
  const searchInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("fetching advocates...");
    const searchQueryParameter =
      searchTerm.length > 0
        ? `?search=${searchTerm}`
        : "";
    fetch(
      `http://localhost:3000/api/advocates${searchQueryParameter}`,
    ).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.results ?? []);
      });
    });
  }, [searchTerm]);

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
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </p>
        <button
          onClick={() => {
            console.log("searching...");
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
          {advocates.map((advocate: Advocate) => {
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
    </main>
  );
}
