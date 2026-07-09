import prisma from "../../../lib/prisma";
import { validateNotice } from "../../../lib/validation";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid notice ID" });
  }

  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      return res.status(200).json(notice);
    } catch {
      return res.status(500).json({ error: "Failed to fetch notice" });
    }
  }

  if (req.method === "PUT") {
    const result = validateNotice(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    try {
      const existingNotice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existingNotice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      const notice = await prisma.notice.update({
        where: { id },
        data: result.data,
      });

      return res.status(200).json(notice);
    } catch {
      return res.status(500).json({ error: "Failed to update notice" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const existingNotice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existingNotice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      await prisma.notice.delete({
        where: { id },
      });

      return res.status(204).end();
    } catch {
      return res.status(500).json({ error: "Failed to delete notice" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Method not allowed" });
}