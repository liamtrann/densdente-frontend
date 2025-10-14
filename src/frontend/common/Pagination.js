// src/frontend/common/Paginaton.js
export default function Pagination({
    page,                   // 1-based
    pageSize,
    total,                  // total items
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50],
}) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const canPrev = page > 1;
    const canNext = page < totalPages;

    const go = (n) => onPageChange?.(Math.min(Math.max(1, n), totalPages));

    return (
        <div className="pager">
            <span>
                Page {page} of {totalPages}
            </span>

            <div className="pager__right">
                {/* first / prev */}
                <button className="btn btn--outline btn--sm" onClick={() => go(1)} disabled={!canPrev}>
                    «
                </button>
                <button className="btn btn--outline btn--sm" onClick={() => go(page - 1)} disabled={!canPrev}>
                    ‹
                </button>

                {/* go to page */}
                <label style={{ marginLeft: 8 }}>Go to page:</label>
                <select value={page} onChange={(e) => go(parseInt(e.target.value, 10))}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>

                {/* page size */}
                <label style={{ marginLeft: 8 }}>Show</label>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange?.(parseInt(e.target.value, 10))}
                >
                    {pageSizeOptions.map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>

                {/* next / last */}
                <button className="btn btn--outline btn--sm" onClick={() => go(page + 1)} disabled={!canNext} style={{ marginLeft: 8 }}>
                    ›
                </button>
                <button className="btn btn--outline btn--sm" onClick={() => go(totalPages)} disabled={!canNext}>
                    »
                </button>
            </div>
        </div>
    );
}
