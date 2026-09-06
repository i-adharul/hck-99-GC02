import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-lg text-gray-500">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link to="/" className="btn btn-neutral mt-4">
        Kembali ke Home
      </Link>
    </div>
  );
}
