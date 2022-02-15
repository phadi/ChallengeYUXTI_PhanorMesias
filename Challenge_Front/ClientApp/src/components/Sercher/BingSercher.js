import React, { Component, useEffect, useState } from 'react';
import { SearchVideos } from './SearchVideos';
import { SearchImages } from './SearchImages';

export class BingSercher extends Component {
    static displayName = BingSercher.name;

    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            loading: true,
            searchResult: [],
            tableResult: [],
            opcionBusqueda: "web"
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.buscaElemento = this.buscaElemento.bind(this);
    }

    static renderSearchResult(searchResult, result) {
        return (
            
            <div>
                <table className='table table-striped' aria-labelledby="locationTable">
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map(searchResult =>
                            <tr key={searchResult.id}>
                                <td><a href={searchResult.url} target="_blank"> {searchResult.name}</a></td>
                                <td><a href={searchResult.url} target="_blank"> {searchResult.url}</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div displayName="inline">
                    <SearchVideos busquedaOri={result.videos} />
                </div> 
                <div displayName="none">
                    <SearchImages busquedaOri={result.images} />
                </div>
            </div> 
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Searching...</em></p>
            : BingSercher.renderSearchResult(this.state.tableResult, this.state.searchResult);
        return (
            <div className="App">
                <div className="containerInput">
                    <input type="text"
                        className="form-control inputBuscar"
                        placeholder="Elemento de busqueda"
                        onChange={this.onChangeValue}
                        value={this.state.busqueda} />
                    <input type="submit"
                        className="btn btn-success"
                        value="Buscar"
                        onClick={this.buscaElemento}
                    />
                </div>
                <div>
                    <h3>BUSQUEDA POR WEBSITES</h3>
                    {contents}
                </div>                
            </div>            
        );
    }

    onChangeValue(event) {
        var elementoBusqueda = event.target.value;
        this.setState({ busqueda: elementoBusqueda });
        if (elementoBusqueda === "") {
            this.setState({ searchResult: [], tableResult: [], loading: true });
        }
    }

    async buscaElemento() {
        console.log(this.state.busqueda);

        if (this.state.busqueda != "") {

            const response = await fetch('search/' + this.state.busqueda);
            const data = await response.json();
            this.setState({ searchResult: data, tableResult: data.webPages.value, loading: false });

            //switch(this.state.opcionBusqueda){
            //    case "web": this.setState({ searchResult: data, tableResult: data.webPages.value, loading: false });
            //        console.log(data.webPages.value);
            //        break;
            //    case "videos": this.setState({ searchResult: data, tableResult: data.videos.value, loading: false });
            //        console.log(data.videos.value);
            //        break;
            //    case "images": this.setState({ searchResult: data, tableResult: data.images.value, loading: false });
            //        console.log(data.images.value);
            //        break;
            //    case "news": this.setState({ searchResult: data, tableResult: data.news.value, loading: false });
            //        console.log(data.news.value);
            //        break;
            //    default: this.setState({ searchResult: data, tableResult: data.webPages.value, loading: false });
            //        console.log(data.webPages.value);
            //        break;
            //}
            
            console.log(data);


            //const { ImageSearchClient } = require("@azure/cognitiveservices-imagesearch");
            //const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

            //const imageSearchKey = "4e4e7732aa244790919c375d66dcb2cc";
            //const imageSearchEndPoint = "https://bingserviceyuxiphadi.cognitiveservices.azure.com/";
            //    //"https://api.bing.microsoft.com/";
            //const cognitiveServiceCredentials = new CognitiveServicesCredentials(imageSearchKey);

            ////https://bingwebsearchpm.cognitiveservices.azure.com/bing/v7.0/images/search?color=Monochrome&count=10&imageType=Photo&q=azure&safeSearch=Strict

            //const client = new ImageSearchClient(cognitiveServiceCredentials, {
            //    endpoint: imageSearchEndPoint
            //});

            //const query = this.state.busqueda;
            //const options = {
            //    color: "Monochrome",
            //    count: 10,
            //    imageType: "Photo",
            //    safeSearch: "Strict"
            //};

            //client.images
            //    .search(query, options)
            //    .then(result => {
            //        console.log("The result is: ");
            //        console.log(result);
            //    })
            //    .catch(err => {
            //        console.log("An error occurred:");
            //        console.error(err);
            //    });
        } else {
            this.setState({ searchResult: [], tableResult: [], loading: true });
        }
    }
}
