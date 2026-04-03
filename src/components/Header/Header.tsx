import './Header.css';

const Header = () => {
  return (
    <nav className="header">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#home">Inicio</a>
        </li>
        <li className="nav-item">
          <a href="#about">About me</a>
        </li>
        <li className="nav-item">
          <a href="#skills">Skills</a>
        </li>
        <li className="nav-item">
          <a href="#projects">My projects</a>
        </li>
        <li className="nav-item">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="header-actions">
        <button className="cv-btn">
          CV
        </button>
        <button className="follow-btn">
          SEGUIR
        </button>
      </div>
    </nav>
  );
};

export default Header;
