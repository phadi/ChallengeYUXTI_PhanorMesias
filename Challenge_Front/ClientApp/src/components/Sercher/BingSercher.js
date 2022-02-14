import React, { Component, useEffect, useState } from 'react';
import axios from "axios";

export class BingSercher extends Component {
    static displayName = BingSercher.name;
    // Cookie names for stored data.
    //static API_KEY_COOKIE = "3a54d38eaf8c4d5fa69ea18926085566";
    //static CLIENT_ID_COOKIE = "3856c5dc-4d91-47ef-ad17-87550e8cfab2";

    //static CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
    //static WebSearchAPIClient = require('@azure/cognitiveservices-websearch');

    //static BING_ENDPOINT = "https://bingwebsearchpm.cognitiveservices.azure.com/";    

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            loading: true,
            searchResult: []
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.buscaElemento = this.buscaElemento.bind(this);
    }

    static renderSearchResult(searchResult) {
        return (
            <table className='table table-striped' aria-labelledby="locationTable">
                <thead>
                    <tr>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map(searchResult =>
                        <tr key={searchResult.Id}>
                            <td>{searchResult.Id}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : BingSercher.renderSearchResult(this.state.searchResult);

        return (
            <div className="App">
                <div className="containerInput">
                    <input type="text"
                        className="form-control inputBuscar"
                        placeholder="Disponibilidad Inicial"
                        onChange={this.onChangeValue}
                        value={this.state.busqueda} />
                    <input type="submit"
                        className="btn btn-success"
                        value="Buscar"
                        onClick={this.buscaElemento}
                    />
                </div>
                <div>
                    {contents}
                </div>
            </div>            
        );
    }

    onChangeValue(event) {
        var elementoBusqueda = event.target.value;
        this.setState({ busqueda: elementoBusqueda});
    }

    buscaElemento() {
        console.log(this.state.busqueda);

        if (this.state.busqueda != "") {
            const { ImageSearchClient } = require("@azure/cognitiveservices-imagesearch");
            const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

            const imageSearchKey = "3d2977816c3542fa8ff38c5d7be33204";
            const imageSearchEndPoint = "https://api.bing.microsoft.com/";
            const cognitiveServiceCredentials = new CognitiveServicesCredentials(imageSearchKey);

            //https://bingwebsearchpm.cognitiveservices.azure.com/bing/v7.0/images/search?color=Monochrome&count=10&imageType=Photo&q=azure&safeSearch=Strict

            const client = new ImageSearchClient(cognitiveServiceCredentials, {
                endpoint: imageSearchEndPoint
            });

            const query = this.state.busqueda;
            const options = {
                color: "Monochrome",
                count: 10,
                imageType: "Photo",
                safeSearch: "Strict"
            };

            client.images
                .search(query, options)
                .then(result => {
                    console.log("The result is: ");
                    console.log(result);
                })
                .catch(err => {
                    console.log("An error occurred:");
                    console.error(err);
                });
        }
    }
}
