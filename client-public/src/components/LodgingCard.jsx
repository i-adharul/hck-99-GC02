export default function LodgingCard({ lodging, detail }) {
  const formatIDR = (n) => `IDR ${n.toLocaleString("id-ID")}`;

  return (
    <>
      <div
        key={lodging.id}
        className="card lg:card-side bg-base-100 shadow-sm border border-base-200 lg:min-h-48"
      >
        {detail ? (
          ""
        ) : (
          <figure className="w-full lg:w-56 h-48 shrink-0">
            <img
              src={lodging.imgUrl}
              alt={lodging.name}
              className="h-48 w-full object-cover"
            />
          </figure>
        )}

        <div className="card-body py-4">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h2 className="card-title text-base">{lodging.name}</h2>
              <div className="flex items-center gap-1 text-orange-400 text-sm">
                {"<Star: ★★★>"}
                <span className="text-base-content/60 font-normal ml-1">
                  {lodging.location}
                </span>
              </div>
            </div>
            <span className="text-sm font-semibold shrink-0">{"<Rating>"}</span>
          </div>

          <p className="text-emerald-600 text-xs font-medium">{"<Tag>"}</p>
          <p className="text-emerald-600 text-xs">{lodging.facility}</p>
        </div>

        <div className="p-4 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-1 lg:border-l border-base-200 lg:w-56 shrink-0">
          <span className="line-through text-xs opacity-50">
            {formatIDR((lodging.price * 105) / 100)}
          </span>
          <span className="text-red-500 font-bold text-lg">
            {formatIDR(lodging.price)}
          </span>
          <span className="text-[11px] opacity-50">
            after taxes: {formatIDR((lodging.price * 111) / 100)}
          </span>
        </div>
      </div>
    </>
  );
}
