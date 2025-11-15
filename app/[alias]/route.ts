import { NextResponse } from "next/server";
import getCollection, { LINKS_COLLECTION } from "@/db";

export async function GET(
  req: Request,
  { params }: { params: { alias: string } }
) {
  const alias = params.alias;

  const linksCollection = await getCollection(LINKS_COLLECTION);

  const doc = await linksCollection.findOne({ alias });

  if (!doc) {
    return NextResponse.json(
      { error: "Alias not found" },
      { status: 404 }
    );
  }

  return NextResponse.redirect(doc.url);
}
