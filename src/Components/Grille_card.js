import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Chambre_card from "./Chambre_card";
import Client_card from "./Client_card";
import Hotel_card from "./Hotel_card";
import Resa_card from "./Resa_card";

class Grille_card extends React.Component {
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
            localStorage.setItem("Hotels", JSON.stringify(json));

          });
        fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Chambre")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              chambres: json,
              DataisLoaded: true,
            });
            localStorage.setItem("Chambres", JSON.stringify(json));

          });
        fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Client")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              clients: json,
              DataisLoaded: true,
              
            });
            localStorage.setItem("Clients", JSON.stringify(json));
          });
        fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Reservation")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              reservations: json,
              DataisLoaded: true,
            });
            localStorage.setItem("Reservation", JSON.stringify(json));

          });
      }
  render() {    
const { DataisLoaded, hotels, clients, chambres, reservations } = this.state;
    return (    
<div>
    
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
                  <Chambre_card id={chambre.id} num={chambre.num} phone={chambre.phone} />
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

export default Grille_card;