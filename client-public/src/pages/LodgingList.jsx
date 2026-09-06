import axios from "axios";
import { baseUrl } from "../constant/baseUrl";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { showErrorToast } from "../utils/toast";
import LodgingCard from "../components/LodgingCard";
import Navbar from "../components/Navbar";

export default function LodgingList() {
  // Search
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    setCurrentPage(1);
  }

  // Filter
  const [filter, setFilter] = useState([]);
  function handleFilter(id) {
    setFilter(
      (prev) =>
        prev.includes(id)
          ? prev.filter((f) => f !== id) // udah ada → hapus (toggle off)
          : [...prev, id], // belum ada → tambahkan (toggle on)
    );
  }

  // Sort
  const [sort, setSort] = useState("");
  function handleSort(value) {
    setSort((prev) => (prev === value ? "" : value));
  }

  // Pagination Setup
  const [loading, setLoading] = useState(false);
  const [lodgings, setLodgings] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [itemInPage, setItemInPage] = useState(0);
  const pages = generatePages();
  function generatePages() {
    const array = [];
    for (let i = 1; i <= totalPage; i++) {
      array.push(i);
    }
    return array;
  }
  function handlePages(page) {
    setCurrentPage(page);
  }
  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // fetching
  async function fetchLodgings() {
    try {
      setLoading(true);
      const filterQuery = filter.length ? `&filter=${filter.join(",")}` : "";
      const { data } = await axios.get(
        `${baseUrl}/lodgings?page=${currentPage}&sort=${sort}&${filterQuery}&search=${search}`,
      );
      setLodgings(data.data);
      setCurrentPage(data.meta.page);
      setTotalPage(data.meta.totalPages);
      setTotalItem(data.meta.totalItems);
      setItemInPage(data.meta.itemInPage);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  async function fetchTypes() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/types`);
      setTypes(data.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLodgings();
    }, 500); // tunggu 500ms setelah ketikan terakhir

    return () => clearTimeout(timeoutId); // batalin timeout lama tiap search berubah lagi
  }, [currentPage, sort, filter, search]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const paginatedHotels = useMemo(() => {
    const start = (currentPage - 1) * itemInPage;
    return lodgings.slice(start, start + itemInPage);
  }, [currentPage]);

  if (loading || !lodgings) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar
          onSubmit={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          search={search}
        />
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <Navbar
        onSubmit={handleSearch}
        onChange={(e) => setSearch(e.target.value)}
        search={search}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex items-stretch gap-6 px-4 md:px-8 py-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-17.5 pt-4 space-y-4">
            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body p-4">
                <h3 className="font-bold text-sm">Kategori Penginapan</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {types.map((type, i) => (
                    <button
                      key={i}
                      className={`btn btn-xs rounded-full ${
                        filter.includes(type.id) ? "btn-primary" : "btn-outline"
                      }`}
                      onClick={() => handleFilter(type.id)}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-sm border border-base-200">
              <div className="card-body p-4">
                <h3 className="font-bold text-sm">Urut Berdasarkan</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    className={`btn btn-xs rounded-full ${
                      sort === "ASC" ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => handleSort("ASC")}
                  >
                    Harga Termurah
                  </button>
                  <button
                    className={`btn btn-xs rounded-full ${
                      sort === "DESC" ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => handleSort("DESC")}
                  >
                    Harga Termahal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Lodging List */}
        <main className="flex-1 space-y-4">
          <p className="text-sm opacity-60">
            Menampilkan {lodgings.length} dari {totalItem} hotel — halaman{" "}
            {currentPage} dari {totalPage}
          </p>

          {/* Card List */}
          {lodgings.map((lodging, i) => (
            <Link key={i} to={`/lodgings/${lodging.id}`}>
              <LodgingCard key={i} lodging={lodging} />
            </Link>
          ))}

          {/* Pagination */}
          <div className="join flex justify-center pt-4">
            <button
              type="button"
              className="join-item btn btn-sm"
              onClick={handlePrevious}
              disabled={currentPage <= 1 ? true : false}
            >
              «
            </button>

            {pages.map((p, i) => {
              return (
                <div key={i}>
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePages(p)}
                    className={`join-item btn btn-sm ${
                      p === currentPage ? "btn-active btn-primary" : ""
                    }`}
                  >
                    {p}
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="join-item btn btn-sm"
              onClick={handleNext}
              disabled={currentPage >= totalPage ? true : false}
            >
              »
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
