import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-red-600 mb-4">404 – Seite nicht gefunden</h1>
      <div className="bg-surface p-4">Testblock mit bg-surface</div>
      <p className="mb-6 text-gray-700">Diese Seite existiert nicht oder wurde verschoben.</p>
      <Link to="/" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Zurück zur Startseite
      </Link>
    </PageWrapper>
  );
}