import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import {
  Advocate,
  Database,
  InsertQuery,
} from "../../utilities/types";

export async function POST() {
  const typedDb = db as Database;
  const records = await typedDb
    .insert<Advocate>(advocates)
    .values(
      advocateData.map((advocate, index) => ({
        ...advocate,
        id: index + 1,
      })),
    )
    .returning();

  return Response.json({ advocates: records });
}
