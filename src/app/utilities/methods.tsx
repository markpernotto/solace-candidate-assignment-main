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
