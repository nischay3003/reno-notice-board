import { useEffect, useState } from "react";
import Link from "next/link";
import NoticeCard from "../components/NoticeCard";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchNotices() {
    try {
      const response = await fetch("/api/notices");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setNotices(data);
    } catch {
      setError("Unable to load notices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setNotices((currentNotices) =>
        currentNotices.filter((notice) => notice.id !== id)
      );
    } catch {
      window.alert("Unable to delete notice");
    }
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">Campus Updates</p>
          <h1>Notice Board</h1>
          <p className="header-description">
            Stay updated with the latest announcements and events.
          </p>
        </div>

        <Link href="/notice" className="add-button">
          Add Notice
        </Link>
      </header>

      {loading && <p className="status-message">Loading notices...</p>}

      {error && <p className="status-message error-text">{error}</p>}

      {!loading && !error && notices.length === 0 && (
        <div className="empty-state">
          <h2>No notices yet</h2>
          <p>Create the first notice for the board.</p>
        </div>
      )}

      {!loading && !error && notices.length > 0 && (
        <section className="notice-grid">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </main>
  );
}