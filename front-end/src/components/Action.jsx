function Action({ handleSearch, openModal, task}) {
  return (
    <div className="action">
      <input onChange={handleSearch} type="text" placeholder="Search Task..."/>
      <button>
        <i className="search-icon" data-feather="search"></i>
      </button>
      <button onClick={openModal}>
        <i className="add-icon" data-feather="plus-circle"></i>
      </button>
    </div>
  );
}

export default Action;
