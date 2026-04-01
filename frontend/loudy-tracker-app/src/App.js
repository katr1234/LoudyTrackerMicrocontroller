import "./App.css";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Info from "./pages/Info";

import logoIcon from "./logo.jpg";
import { ReactComponent as InfoBtnIcon } from "./pages/icons/infoBtn.svg";

function HeaderNav() {
  const { pathname } = useLocation();
  const isInfo = pathname.startsWith("/info");
  const dashboardClass = isInfo ? "navBtn" : "navActive";
  const infoClass = isInfo ? "navActive" : "navBtn";

  return (
    <nav className="nav">
      <NavLink to="/" end className={dashboardClass}>
        Dashboard
      </NavLink>

      <NavLink to="/info" className={infoClass}>
        <InfoBtnIcon className="navBtnIcon" aria-hidden="true" focusable="false" />
        Information
      </NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="topbar">
          <div className="brand">
            <div className="brandIcon" aria-hidden="true">
              <img src={logoIcon} alt="Loudy Tracker" className="logoIcon" />
            </div>
            <div>
              <div className="brandName">Loudy Tracker</div>
              <div className="brandTagline">
                Lärmpegelüberwachung & Gesundheitsvorsorge
              </div>
            </div>
          </div>

          <HeaderNav />
        </div>

        <div className="headline">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="title">Dashboard</h1>
                  <p className="subtitle">Übersicht deiner Messwerte</p>
                </>
              }
            />
            <Route
              path="/info"
              element={
                <>
                  <h1 className="title">Informationen & Referenzwerte</h1>
                  <p className="subtitle">
                    Übersicht über Lärmpegelkategorien und Schutzmaßnahmen für ein gesundes Arbeitsumfeld
                  </p>
                </>
              }
            />
          </Routes>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}