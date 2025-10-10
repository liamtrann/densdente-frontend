// Replace the whole file with this
export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: Comp = "button", // can be "button", "a", or a component like Link
  href,
  to,
  style,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size}`;
  const props = { className: cls, style, ...rest };
  if (href) props.href = href; // for anchors
  if (to) props.to = to; // for <Link to="...">

  return <Comp {...props}>{children}</Comp>;
}
