// src/frontend/common/DataTable.jsx
/**
 * columns: [
 *   { key: "clinic", header: "Clinic", width: 160 },
 *   { header: "Actions", render: (row, i) => <Button>...</Button>, align: "right" }
 * ]
 * data: array of row objects
 * rowKey: string key on each row (or function) to produce stable keys
 */
export default function DataTable({ columns = [], data = [], rowKey }) {
  const getKey = (row, i) =>
    typeof rowKey === "function" ? rowKey(row, i) : rowKey ? row[rowKey] : i;

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  width: col.width,
                  textAlign: col.align || "left",
                  whiteSpace: col.nowrap ? "nowrap" : undefined,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rIdx) => (
            <tr key={getKey(row, rIdx)}>
              {columns.map((col, cIdx) => {
                const value = col.render
                  ? col.render(row, rIdx)
                  : col.key
                  ? row[col.key]
                  : null;
                return (
                  <td
                    key={cIdx}
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
