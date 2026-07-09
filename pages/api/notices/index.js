import prisma from "../../../lib/prisma";
import { validateNotice } from "../../../lib/validation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            priority: "asc",
          },
          {
            publishDate: "desc",
          },
        ],
      });

      return res.status(200).json(notices);
    } catch {
      return res.status(500).json({ error: "Failed to fetch notices" });
    }
  }

  if (req.method === "POST") {
    const result = validateNotice(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    try {
      const notice = await prisma.notice.create({
        data: result.data,
      });

      return res.status(201).json(notice);
    } catch {
      return res.status(500).json({ error: "Failed to create notice" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}