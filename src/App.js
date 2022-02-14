/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";


import Grille_card from "./Components/Grille_card";
import HotelView from './Components/View/Hotel.View';
import ClientView from "./Components/View/Client.View";
import ChambreView from "./Components/View/Chambre.View";
import ResaView from "./Components/View/Resa.View";

class App extends React.Component {



  render() {

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">            <div class="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-center"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Gestion Hotelière
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Hotels">
                    Hôtels
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Clients" tabindex="-1">
                    Clients
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="/Chambres">
                    Chambres
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Reservations">
                    Réservations
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Grille_card />} />
          <Route exact path="/Hotels" element={<HotelView />} />
          <Route exact path="/Reservations" element={<ResaView />} />
          <Route exact path="/Chambres" element={<ChambreView />} />
          <Route exact path="/Clients" element={<ClientView />} />

        </Routes>
      </div>
    );
  }
}

export default App;
