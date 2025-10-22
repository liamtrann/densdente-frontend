// src/common/Button.jsx
export default function Button({
  children,
  variant = "primary",
  size = "md",
  block = false, // NEW: full-width button
  as: Comp = "button", // "button", "a", or a React component like Link
  href,
  to,
  disabled,
  className = "", // NEW: allow extra classes
  style,
  ...rest
}) {
  const cls = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    block ? "btn--block" : "",
    disabled ? "btn--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const props = { className: cls, style, disabled, ...rest };
  if (href) props.href = href;
  if (to) props.to = to;

  return <Comp {...props}>{children}</Comp>;
}
