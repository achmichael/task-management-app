function Header( { className , title, content }) {
  return (
    <div className={className ? className : ''}>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export default Header;
