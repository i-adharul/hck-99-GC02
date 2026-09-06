import { Link } from "react-router";

export default function Navbar({ onSubmit, onChange, search }) {
  return (
    <>
      <div
        className={`sticky top-0 z-30 navbar bg-base-100 shadow-sm transition-shadow`}
      >
        <div className="flex-1 flex items-center gap-3">
          <Link to={`/`}>
            <span className="btn btn-ghost text-xl">TiketStays</span>
          </Link>

          {onSubmit ? (
            <label className="flex items-center gap-2 w-64 md:w-72 rounded-full bg-base-200 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-50 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Cari Penginapan"
                  className="grow bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm placeholder:text-base-content/50"
                  value={search}
                  onChange={onChange}
                />
              </form>
            </label>
          ) : (
            ""
          )}
        </div>

        <button className="btn btn-sm rounded-full bg-gray-200 hover:bg-gray-50 border-none">
          Gabung | Daftar
        </button>
      </div>
    </>
  );
}
