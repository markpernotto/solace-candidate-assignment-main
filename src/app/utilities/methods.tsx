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
  page?: number,
) => {
  const advocatesEndpoint =
    "http://localhost:3000/api/advocates";
  const queryParts = [];

  if (searchInput && searchInput.length > 0) {
    queryParts.push("search=" + searchInput);
  }
  if (page !== undefined) {
    queryParts.push("page=" + page);
  }

  return `${advocatesEndpoint}${
    queryParts.length > 0
      ? "?" + queryParts.join("&")
      : ""
  }`;
};
