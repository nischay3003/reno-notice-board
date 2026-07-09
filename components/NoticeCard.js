import Link from "next/link";

export default function NoticeCard({ notice, onDelete }) {
  const formattedDate = new Date(notice.publishDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <article className={`notice-card ${notice.priority === "Urgent" ? "urgent-card" : ""}`}>
      <div className="card-top">
        <span className="category-badge">{notice.category}</span>
        {notice.priority === "Urgent" && (
          <span className="urgent-badge">Urgent</span>
        )}
      </div>

      <h2>{notice.title}</h2>
      <p className="notice-body">{notice.body}</p>

      <div className="card-footer">
        <span className="publish-date">{formattedDate}</span>

        <div className="card-actions">
          <Link href={`/notice?id=${notice.id}`} className="edit-button">
            Edit
          </Link>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(notice.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}