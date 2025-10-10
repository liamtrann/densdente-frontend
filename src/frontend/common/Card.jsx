export default function Card({ children, title, right, style }) {
  return (
    <div className="card" style={style}>
      {(title || right) && (
        <div className="card__head">
          {title && <h3 className="card__title">{title}</h3>}
          {right && <div className="card__right">{right}</div>}
        </div>
      )}
      <div className="card__body">{children}</div>
    </div>
  );
}
