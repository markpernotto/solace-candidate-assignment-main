import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { Advocate } from "../../page";

export async function POST() {
  interface InsertQuery<T> {
    values(data: T[]): {
      returning(): Promise<T[]>;
    };
  }

  interface Database {
    insert<T>(table: unknown): InsertQuery<T>;
  }

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
