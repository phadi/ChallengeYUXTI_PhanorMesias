import React, { Component, useEffect, useState } from 'react';
import axios from "axios";


export class BingSercher extends Component {
    static displayName = BingSercher.name;
    // Cookie names for stored data.
    static API_KEY_COOKIE = "68424938d0fd43ec8aed278149eecfbd";
    static CLIENT_ID_COOKIE = "3856c5dc-4d91-47ef-ad17-87550e8cfab2";

    static BING_ENDPOINT = "https://bingwebsearchpm.cognitiveservices.azure.com/";

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);

        /*const [usuarios, setUsuarios] = useState([]);
        const [tablaUsuarios, setTablaUsuarios] = useState([]);
        const [busqueda, setBusqueda] = useState("");

        const peticionGet = async () => {
            await axios.get("https://jsonplaceholder.typicode.com/users")
                .then(response => {
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                })
        }

        useEffect(() => {
            peticionGet();
        }, [])*/
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

     

    render() {
        return (
            <div>
                <h1>Sercher</h1>
               
                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
                
            </div>
        );
    }
}
