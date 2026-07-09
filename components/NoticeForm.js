import { useState } from "react";

export default function NoticeForm({ initialData, noticeId }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    body: initialData?.body || "",
    category: initialData?.category || "General",
    priority: initialData?.priority || "Normal",
    publishDate: initialData?.publishDate
      ? initialData.publishDate.slice(0, 10)
      : "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        noticeId ? `/api/notices/${noticeId}` : "/api/notices",
        {
          method: noticeId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Unable to save notice");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="notice-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          rows="6"
          value={form.body}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="publishDate">Publish Date</label>
        <input
          id="publishDate"
          name="publishDate"
          type="date"
          value={form.publishDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Cancel
        </button>
        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting
            ? "Saving..."
            : noticeId
              ? "Update Notice"
              : "Create Notice"}
        </button>
      </div>
    </form>
  );
}