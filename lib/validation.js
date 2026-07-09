const categories = ["Exam", "Event", "General"];
const priorities = ["Normal", "Urgent"];

export function validateNotice(data) {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const body = typeof data.body === "string" ? data.body.trim() : "";

  if (!title || !body) {
    return { error: "Title and body are required" };
  }

  if (!categories.includes(data.category)) {
    return { error: "Invalid category" };
  }

  if (!priorities.includes(data.priority)) {
    return { error: "Invalid priority" };
  }

  if (!data.publishDate) {
    return { error: "Publish date is required" };
  }

  const publishDate = new Date(data.publishDate);

  if (Number.isNaN(publishDate.getTime())) {
    return { error: "Invalid publish date" };
  }

  return {
    data: {
      title,
      body,
      category: data.category,
      priority: data.priority,
      publishDate,
    },
  };
}