import { NextRequest, NextResponse } from "next/server";
import getCollection, { LINKS_COLLECTION } from "@/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ alias: string }> }
) {
  const { alias } = await context.params;

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
