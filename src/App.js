/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import Chambre_card from "./Components/Chambre_card";
import Client_card from "./Components/Client_card";
import Hotel_card from "./Components/Hotel_card";
import Resa_card from "./Components/Resa_card";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotels: [],
      clients: [],
      chambres: [],
      reservations: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Hotel")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          hotels: json,
          DataisLoaded: true,
        });
      });
    fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Chambre")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          chambres: json,
          DataisLoaded: true,
        });
      });
    fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Client")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          clients: json,
          DataisLoaded: true,
        });
        console.log(json);
      });
    fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Reservation")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          reservations: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, hotels, clients, chambres, reservations } =
      this.state;
    return (
      <div className="App">
        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark"
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample08"
              aria-controls="navbarsExample08"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse justify-content-md-center"
              id="navbarsExample08"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" href="">
                    Gestion Hotelière
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Hôtels
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="##" tabindex="-1">
                    Clients
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link" href="###">
                    Chambres
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Réservation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Tabs
          defaultActiveKey="hotel"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="hotel" title="🏢 Hôtel 🏢">
            <div className="grille">
              {hotels.map((hotel) => (
                <ol key={hotel.id}>
                  <Hotel_card
                    id={hotel.id}
                    name={hotel.name}
                    adress={hotel.adress}
                    phone={hotel.phone}
                  />
                </ol>
              ))}
            </div>
          </Tab>
          <Tab eventKey="resa" title="🎫 Réservation 🎫">
            <div className="grille">
              {reservations.map((resa) => (
                <ol key={resa.id}>
                  <Resa_card
                    num={resa.num}
                    dateresa={resa.dateresa.toString().slice(0, 10)}
                    datedeb={resa.datedeb.toString().slice(0, 10)}
                    datefin={resa.datefin.toString().slice(0, 10)}
                    amount={resa.amount.toString().slice(0, 10)}
                  />
                </ol>
              ))}
            </div>
          </Tab>
          <Tab eventKey="chambre" title="🛏 Chambre 🛏">
            <div className="grille">
              {chambres.map((chambre) => (
                <ol key={chambre.id}>
                  <Chambre_card id={chambre.id} phone={chambre.phone} />
                </ol>
              ))}
            </div>
          </Tab>
          <Tab eventKey="client" title="👨 Client 👨">
          <div className="grille">
            {clients.map((client) => (
              <ol key={client.id}>
                <Client_card
                  firstname={client.firstname}
                  lastname={client.lastname}
                  adress={client.adress}
                  city={client.city}
                  zipcode={client.zipcode}
                  country={client.country}
                  phone={client.phone}
                  email={client.email}
                />
              </ol>
            ))}
          </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
