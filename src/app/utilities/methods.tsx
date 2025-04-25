import {
  Advocate,
  AdvocatesApiResponse,
} from "../utilities/types";

export const fetcher = async (
  url: string,
): Promise<Advocate[]> =>
  fetch(url)
    .then(
      (response: Response) =>
        response.json() as Promise<AdvocatesApiResponse>,
    )
    .then(
      (data: AdvocatesApiResponse) =>
        data.results,
    );

export const constructUrl = (
  searchInput: string,
) => {
  const advocatesEndpoint =
    "http://localhost:3000/api/advocates";
  return `${advocatesEndpoint}${
    searchInput && searchInput.length > 0
      ? "?search=" + searchInput
      : ""
  }`;
};
