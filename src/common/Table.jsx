export function Table({ children }) {
  return <div className="table-wrap"><table className="table">{children}</table></div>;
}

export function THead({ children }) {
  return <thead><tr>{children}</tr></thead>;
}
export function Th({ children, width }) {
  return <th style={{ width }}>{children}</th>;
}
export function TBody({ children }) {
  return <tbody>{children}</tbody>;
}
export function Tr({ children }) {
  return <tr>{children}</tr>;
}
export function Td({ children }) {
  return <td>{children}</td>;
}
