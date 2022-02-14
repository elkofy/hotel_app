import React from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import Hotel_card from "../Hotel_card";

class HotelView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: JSON.parse(localStorage.getItem("Hotels")),
      chambres: JSON.parse(localStorage.getItem("Chambres")),
      firsthotel: "",

      isediting: false,
      selectedHotel: JSON.parse(localStorage.getItem("Hotels"))[0].name,
      selectedChambre: JSON.parse(localStorage.getItem("Chambres"))[0].num,
      currentName: "",
      currentPhone: "",
      currentAdress: "",
      currentId: "",
      currentRoom: "",
      alert: false,
    };
  }
  alert = {
    hdr: "yes",
    variant: "success",
    msg: "yes",
  };
  clickme = (id) => {
    console.log("clicked", id);
  };
  addHotel = () => {
    if (
      this.state.currentName === "" ||
      this.state.currentPhone === "" ||
      this.state.currentAdress === ""
    ) {
      this.alert.hdr = "Erreur";
      this.alert.variant = "danger";
      this.alert.msg = "Veuillez remplir tous les champs";
      this.setState({ alert: true });
      return;
    }
    let obj = {
      name: this.state.currentName,
      phone: this.state.currentPhone,
      adress: this.state.currentAdress,
    };

    let hotelstate = this.state.hotels;

    fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Hotel", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        hotelstate.push(value);
        localStorage.setItem("Hotels", JSON.stringify(hotelstate));
        this.setState({
          hotels: hotelstate,
          currentName: "",
          currentPhone: "",
          currentAdress: "",
        });
      });
  };

  removeHotel = (id) => {
    let hotelstate = this.state.hotels;
    hotelstate = hotelstate.filter((hotel) => hotel.id !== id);
    localStorage.setItem("Hotels", JSON.stringify(hotelstate));
    this.setState({ hotels: hotelstate });
  };

  editHotel = (id, obj) => {
    this.setState({
      isediting: true,
      currentName: obj.name,
      currentPhone: obj.phone,
      currentAdress: obj.adress,
      currentId: id,
    });
  };


  linkHotel2Chambre = () => {
    if (localStorage.getItem("Hotel2chambre") === null) {
      let obj = [{
        hotel: this.state.selectedHotel,
        chambre: this.state.selectedChambre,
      }]
      localStorage.setItem("Hotel2chambre", JSON.stringify(obj));

    } else {

      var obj = JSON.parse(localStorage.getItem("Hotel2chambre"));
      let newval = {
        hotel: this.state.selectedHotel,
        chambre: this.state.selectedChambre,
      }
      console.log(obj.filter((hotel) => hotel.chambre === this.state.selectedChambre).length > 0);
      if (obj.filter((hotel) => hotel.chambre === this.state.selectedChambre).length > 0) {
        this.alert.hdr = "Erreur";
        this.alert.variant = "danger";
        this.alert.msg = "Cette chambre est déjà liée à ce hôtel";
        this.setState({ alert: true });
        setTimeout(() => {
          this.setState({ alert: false });
        }, 1000);
        return;
      } else {
        this.alert.hdr = "Succès";
        this.alert.variant = "success";
        this.alert.msg = "Cette chambre est liée à ce hôtel";
        this.setState({ alert: true });
        setTimeout(() => {
          this.setState({ alert: false });
        }, 1000);
        obj.push(newval);
      }

      localStorage.setItem("Hotel2chambre", JSON.stringify(obj));
    }
  }


  saveHotel = () => {
    let hotelstate = this.state.hotels;
    let hotel = hotelstate.find((hotel) => hotel.id === this.state.currentId);
    hotel.name = this.state.currentName;
    hotel.phone = this.state.currentPhone;
    hotel.adress = this.state.currentAdress;
    localStorage.setItem("Hotels", JSON.stringify(hotelstate));
    let obj = {
      name: this.state.currentName,
      phone: this.state.currentPhone,
      adress: this.state.currentAdress,
    };
    fetch(
      "https://6200fa65fdf509001724974a.mockapi.io/Hotel/Hotel/" +
      this.state.currentId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    ).then((res) => res.text());
    this.setState({
      hotels: hotelstate,
      isediting: false,
      currentName: "",
      currentPhone: "",
      currentAdress: "",
    });
  };

  render() {
    const hotels = this.state.hotels;
    const chambres = this.state.chambres;
    const hotel2chambre = JSON.parse(localStorage.getItem("Hotel2chambre")) || [];
    return (
      <div>
        <div className="row m-1">
          <h1>Hôtel</h1>
          <div className="col-4">
            <h4>Ajouter un hôtel</h4>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  onChange={(event) =>
                    this.setState({ currentName: event.target.value })
                  }
                  value={this.state.currentName}
                />
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="319-9132"
                  onChange={(event) =>
                    this.setState({ currentPhone: event.target.value })
                  }
                  value={this.state.currentPhone}
                />
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="970 Robel Course"
                  onChange={(event) =>
                    this.setState({ currentAdress: event.target.value })
                  }
                  value={this.state.currentAdress}
                />
                <br></br>
                {this.state.isediting ? (
                  <Button onClick={this.saveHotel}>Modifiez</Button>
                ) : (
                  <Button onClick={this.addHotel}>Ajouter</Button>
                )}
              </Form.Group>
            </Form>
          </div>
          <div className="col-4">
            <Form>
              <h4>Ajouter une chambre à un hôtel</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Hôtel</Form.Label>
                <select defaultValue={this.state.selectedHotel} onChange={(event) =>
                  this.setState({ selectedHotel: event.target.value })}
                  class="form-control">
                  {hotels.map((hotel) => (
                    <option key={hotel.id}>{hotel.name}</option>
                  ))}
                </select>
                <Form.Label>Chambre</Form.Label>
                <select defaultValue={this.state.selectedChambre} onChange={(event) =>
                  this.setState({ selectedChambre: event.target.value })
                } class="form-control" >
                  {chambres.map((chambre) => (
                    <option key={chambre.id}>n°{chambre.num}</option>
                  ))}
                </select>
                <br></br>
                <Button onClick={this.linkHotel2Chambre} >Ajouter</Button>
              </Form.Group>
            </Form>
          </div>
          <div className="col-2">
            <Alert show={this.state.alert} variant={this.alert.variant}>
              <Alert.Heading>{this.alert.hdr}</Alert.Heading>
              <p>{this.alert.msg}</p>
            </Alert>
          </div>
          <div className="col-2">
            <Table>
              <thead>
                <tr>
                  <th>Hotels</th>
                  <th>Chambres</th>
                </tr>

              </thead>
              <tbody>
                  {hotel2chambre.map((hotel) => (
                    <tr>
                      <td>{hotel.hotel}</td>
                      <td>{hotel.chambre}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row m-1">
          <div className="grille">
            {hotels.map((hotel) => (
              <ol key={hotel.id}>
                <Hotel_card
                  id={hotel.id}
                  name={hotel.name}
                  adress={hotel.adress}
                  phone={hotel.phone}
                  edit={true}
                  clickme={this.clickme}
                  removeHotel={this.removeHotel}
                  editHotel={this.editHotel}
                />
              </ol>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default HotelView;
