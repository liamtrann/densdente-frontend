export default function DataTable({ columns = [], data = [], rowKey }) {
  const keyFor = (row, i) =>
    typeof rowKey === "function" ? rowKey(row, i) : rowKey ? row[rowKey] : i;

  return (
    <div className="overflow-auto">
      <table className="w-full border-separate border-spacing-0 text-[15px]">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-[12px] font-semibold text-gray-500 border-b border-gray-100 whitespace-nowrap"
                style={{ width: col.width, textAlign: col.align || "left" }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((row, rIdx) => (
            <tr
              key={keyFor(row, rIdx)}
              className="hover:bg-indigo-50/30 transition-colors"
            >
              {columns.map((col, cIdx) => {
                const value = col.render
                  ? col.render(row, rIdx)
                  : col.key
                  ? row[col.key]
                  : null;
                return (
                  <td
                    key={cIdx}
                    className="px-4 py-3 align-middle"
                    style={{
                      textAlign: col.align || "left",
                      whiteSpace: col.nowrap ? "nowrap" : undefined,
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
