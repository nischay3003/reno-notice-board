import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoticeForm from "../components/NoticeForm";

export default function NoticePage() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady || !id) {
      return;
    }

    async function fetchNotice() {
      setLoading(true);

      try {
        const response = await fetch(`/api/notices/${id}`);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setNotice(data);
      } catch {
        setError("Unable to load notice");
      } finally {
        setLoading(false);
      }
    }

    fetchNotice();
  }, [router.isReady, id]);

  return (
    <main className="form-page">
      <div className="form-container">
        <Link href="/" className="back-link">
          ← Back to Notice Board
        </Link>

        <div className="form-heading">
          <h1>{id ? "Edit Notice" : "Add Notice"}</h1>
          <p>
            {id
              ? "Update the details of this notice."
              : "Add a new announcement to the notice board."}
          </p>
        </div>

        {loading && <p className="status-message">Loading notice...</p>}

        {error && <p className="status-message error-text">{error}</p>}

        {!id && <NoticeForm />}

        {id && notice && <NoticeForm initialData={notice} noticeId={id} />}
      </div>
    </main>
  );
}