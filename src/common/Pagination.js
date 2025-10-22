export default function Pagination({
    page,
    pageSize,
    total,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50],
}) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const go = (n) =>
        onPageChange?.(Math.min(Math.max(1, n), totalPages));

    const Btn = (props) => (
        <button
            {...props}
            className={`inline-flex items-center justify-center rounded-full border-2 border-indigo-300 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:border-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed ${props.className || ""}`}
        />
    );

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600 px-5 py-4">
            <span>
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
                <Btn onClick={() => go(1)} disabled={page <= 1}>«</Btn>
                <Btn onClick={() => go(page - 1)} disabled={page <= 1}>‹</Btn>

                <label className="ml-2">Go to page:</label>
                <select
                    className="border rounded-md px-2 py-1"
                    value={page}
                    onChange={(e) => go(parseInt(e.target.value, 10))}
                >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>

                <label className="ml-2">Show</label>
                <select
                    className="border rounded-md px-2 py-1"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange?.(parseInt(e.target.value, 10))}
                >
                    {pageSizeOptions.map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>

                <Btn className="ml-2" onClick={() => go(page + 1)} disabled={page >= totalPages}>›</Btn>
                <Btn onClick={() => go(totalPages)} disabled={page >= totalPages}>»</Btn>
            </div>
        </div>
    );
}
