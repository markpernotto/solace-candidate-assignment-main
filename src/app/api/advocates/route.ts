import {
  NextRequest,
  NextResponse,
} from "next/server";
import { or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const search = urlParams.get("search");
  const pageParam = urlParams.get("page");
  const page = pageParam
    ? parseInt(pageParam, 10)
    : 1;

  const offset =
    (page - 1) *
    Number(process.env.NEXT_PUBLIC_MAX_ADVOCATES);

  let results = await db
    .select()
    .from(advocates)
    .limit(
      Number(
        process.env.NEXT_PUBLIC_MAX_ADVOCATES,
      ),
    )
    .offset(offset);
  if (search) {
    try {
      const searchTerm = search.toLowerCase();
      results = await db
        .select()
        .from(advocates)
        .where(
          or(
            sql`lower(${
              advocates.firstName
            }) LIKE ${"%" + searchTerm + "%"}`,
            sql`lower(${
              advocates.lastName
            }) LIKE ${"%" + searchTerm + "%"}`,
            sql`lower(${advocates.city}) LIKE ${
              "%" + searchTerm + "%"
            }`,
            sql`lower(${advocates.degree}) LIKE ${
              "%" + searchTerm + "%"
            }`,
            sql`${
              advocates.yearsOfExperience
            }::text LIKE ${
              "%" + searchTerm + "%"
            }`,
            sql`${
              advocates.phoneNumber
            }::text LIKE ${
              "%" + searchTerm + "%"
            }`,
          ),
        )
        .limit(
          Number(
            process.env.NEXT_PUBLIC_MAX_ADVOCATES,
          ),
        )
        .offset(offset);
    } catch (error: any | unknown) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { results },
    { status: 200 },
  );
}
