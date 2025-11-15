"use server";

import getCollection, { LINKS_COLLECTION } from "@/db";
import { LinkProps } from "@/types";

export default async function createNewShortUrl(
  url: string,
  alias: string
): Promise<LinkProps> {

  const doc = {
    url,
    alias,
  };

  const linksCollection = await getCollection(LINKS_COLLECTION);
  const res = await linksCollection.insertOne(doc);

  if (!res.acknowledged) {
    throw new Error("DB insert failed");
  }

  return doc;
}
