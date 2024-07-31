export function ListItem({ className, href, label }) {
  return (
    <li className={className ? className : ''}>
      <Link href={href} label={label} />
    </li>
  );
}

function Link({ href, label }) {
  return <a href={href}>{label}</a>;
}
