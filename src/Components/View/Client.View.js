import React from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import Client_card from "../Client_card";

class ClientView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: JSON.parse(localStorage.getItem("Clients")),
            isediting: false,
            currentName: "",
            currentPrenom: "",
            currentAdress: "",
            currentVille: "",
            currentZip: "",
            currentPays: "",
            currentTel: "",
            currentEmail: "",
            currentId: "",
            alert: false,
        };
    }
    alert = {
        hdr: "yes",
        variant: "success",
        msg: "yes",
    };
    addClient = () => {
        if (
            this.state.currentName === "" ||
            this.state.currentPhone === "" ||
            this.state.currentAdress === "" ||
            this.state.currentVille === "" ||
            this.state.currentZip === "" ||
            this.state.currentPays === "" ||
            this.state.currentTel === "" ||
            this.state.currentEmail === ""

        ) {
            this.alert.hdr = "Erreur";
            this.alert.variant = "danger";
            this.alert.msg = "Veuillez remplir tous les champs";
            this.setState({ alert: true });
            return;
        }
        let obj = {
            firstname: this.state.currentName,
            lastname: this.state.currentPrenom,
            adress: this.state.currentAdress,
            city: this.state.currentVille,
            zipcode: this.state.currentZip,
            country: this.state.currentPays,
            phone: this.state.currentTel,
            email: this.state.currentEmail,



        };

        let clientstate = this.state.clients;

        fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Client", {
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
                clientstate.push(value);
                localStorage.setItem("Clients", JSON.stringify(clientstate));
                this.setState({
                    hotels: clientstate,
                    currentName: "",
                    currentPrenom: "",
                    currentAdress: "",
                    currentVille: "",
                    currentZip: "",
                    currentPays: "",
                    currentTel: "",
                    currentEmail: "",


                });
            });
    };

    removeClient = (id) => {
        let clientstate = this.state.clients;
        clientstate = clientstate.filter((client) => client.id !== id);
        localStorage.setItem("Hotels", JSON.stringify(clientstate));
        this.setState({ clients: clientstate });
    };

    editClient = (id, obj) => {
        this.setState({
            isediting: true,
            currentName: obj.firstname,
            currentPrenom: obj.lastname,
            currentAdress: obj.adress,
            currentVille: obj.city,
            currentZip: obj.zipcode,
            currentPays: obj.country,
            currentTel: obj.phone,
            currentEmail: obj.email,
            currentId: id,
        });
    };



    saveClient = () => {
        let clientstate = this.state.clients;
        let client = clientstate.find((client) => client.id === this.state.currentId);
        client.firstname = this.state.currentName;
        client.lastname = this.state.currentPrenom;
        client.adress = this.state.currentAdress;
        client.city = this.state.currentVille;
        client.zipcode = this.state.currentZip;
        client.country = this.state.currentPays;
        client.phone = this.state.currentTel;
        client.email = this.state.currentEmail;
        localStorage.setItem("Hotels", JSON.stringify(clientstate));
        let obj = {
            firstname: this.state.currentName,
            lastname: this.state.currentPrenom,
            adress: this.state.currentAdress,
            city: this.state.currentVille,
            zipcode: this.state.currentZip,
            country: this.state.currentPays,
            phone: this.state.currentTel,
            email: this.state.currentEmail,
        };
        fetch(
            "https://6200fa65fdf509001724974a.mockapi.io/Hotel/Client/" +
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
            hotels: clientstate,
            isediting: false,
            currentName: "",
            currentPrenom: "",
            currentAdress: "",
            currentVille: "",
            currentZip: "",
            currentPays: "",
            currentTel: "",
            currentEmail: "",
            
        });
    };

    render() {
        const clients = this.state.clients;
        return (
            <div>
                <div className="row m-1">
                    <h1>Client</h1>
                    <div className="col-4">
                        <h4>Ajouter un Client</h4>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" placeholder="Nom" onChange={(event) =>
                                    this.setState({ currentName: event.target.value })}
                                    value={this.state.currentName}
                                />
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" placeholder="Prénom" onChange={(event) =>
                                    this.setState({ currentPrenom: event.target.value })}
                                    value={this.state.currentPrenom}
                                />
                                <Form.Label>Adresse</Form.Label>
                                <Form.Control type="text" placeholder="970 Robel Course" onChange={(event) =>
                                    this.setState({ currentAdress: event.target.value })}
                                    value={this.state.currentAdress}
                                />
                                <Form.Label>Ville</Form.Label>
                                <Form.Control type="text" placeholder="Lyon" onChange={(event) =>
                                    this.setState({ currentVille: event.target.value })}
                                    value={this.state.currentVille}
                                />
                                <Form.Label>Code Postal</Form.Label>
                                <Form.Control type="text" placeholder="69000" onChange={(event) =>
                                    this.setState({ currentZip: event.target.value })}
                                    value={this.state.currentZip}
                                />
                                <Form.Label>Pays</Form.Label>
                                <Form.Control type="text" placeholder="France" onChange={(event) =>
                                    this.setState({ currentPays: event.target.value })}
                                    value={this.state.currentPays}
                                />
                                <Form.Label>Tél.</Form.Label>
                                <Form.Control type="text" placeholder="06 59 59" onChange={(event) =>
                                    this.setState({ currentTel: event.target.value })}
                                    value={this.state.currentTel}
                                />
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="970 Robel Course" onChange={(event) =>
                                    this.setState({ currentEmail: event.target.value })}
                                    value={this.state.currentEmail}
                                />
                                <br></br>
                                {this.state.isediting ? (
                                    <Button onClick={this.saveClient}>Modifiez</Button>
                                ) : (
                                    <Button onClick={this.addClient}>Ajouter</Button>
                                )}
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-2">
                        <Alert show={this.state.alert} variant={this.alert.variant}>
                            <Alert.Heading>{this.alert.hdr}</Alert.Heading>
                            <p>{this.alert.msg}</p>
                        </Alert>
                    </div>

                </div>
                <div className="row m-1">
                    <div className="grille">
                        {clients.map((client) => (
                            <ol key={client.firstname}>
                                <Client_card
                                    id={client.id}
                                    firstname={client.firstname}
                                    lastname={client.lastname}
                                    adress={client.adress}
                                    phone={client.phone}
                                    city={client.city}
                                    country={client.country}
                                    zipcode={client.zipcode}
                                    email={client.email}
                                    edit={true}
                                    removeClient={this.removeClient}
                                    editClient={this.editClient}

                                />
                            </ol>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientView;
