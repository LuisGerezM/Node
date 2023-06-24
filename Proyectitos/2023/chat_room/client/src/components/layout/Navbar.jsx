const Navbar = () => {
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='/' className='brand-logo'>
            Chat
          </a>
          <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
