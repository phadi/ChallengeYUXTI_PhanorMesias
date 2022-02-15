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
            tableResultVideo: [],
            tableResultImage: [],
            opcionBusqueda: "WebPages"
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.buscaElemento = this.buscaElemento.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }

    static renderSearchResult(searchResult, resultVideo, resultImage, opcionBusqueda) {
        return (
            
            <div>
                <div className={opcionBusqueda === 'WebPages' ? "div-inline" : "div-none"}>
                    <h3>BUSQUEDA POR WEBSITES</h3>
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
                </div>                
                <div className={opcionBusqueda === 'Videos' ? "div-inline" : "div-none"}>
                    <h3>BUSQUEDA POR VIDEOS</h3>
                    <table className='table table-striped' aria-labelledby="locationTable">
                        <thead>
                            <tr>
                                <th>Text</th>
                                <th>Descripcion</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultVideo.map(searchResult =>
                                <tr key={searchResult.webSearchUrl}>
                                    <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.name}</a></td>
                                    <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.description}</a></td>
                                    <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.contentUrl}</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div> 
                <div className={opcionBusqueda === 'Imagenes' ? "div-inline" : "div-none"}>
                    <h3>BUSQUEDA POR IMAGENES</h3>
                    <table className='table table-striped' aria-labelledby="locationTable">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultImage.map(searchResult =>
                                <tr key={searchResult.webSearchUrl}>
                                    <td><a href={searchResult.contentUrl} target="_blank"> <img src={searchResult.contentUrl} width="60" height="60" /></a></td>
                                    <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.name}</a></td>
                                    <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.contentUrl}</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div> 
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Searching...</em></p>
            : BingSercher.renderSearchResult(this.state.tableResult, this.state.tableResultVideo, this.state.tableResultImage, this.state.opcionBusqueda);
        return (
            <div className="App">
                <div>
                    <input type="submit"
                        className={this.state.opcionBusqueda === 'WebPages' ? "btn btn-selected" : "btn btn-primary"} 
                        value="WebPages"
                        onClick={this.onChangeType}
                    />&nbsp;&nbsp;
                    <input type="submit"
                        className={this.state.opcionBusqueda === 'Videos' ? "btn btn-selected" : "btn btn-primary"} 
                        value="Videos"
                        onClick={this.onChangeType}
                    />&nbsp;&nbsp;
                    <input type="submit"
                        className={this.state.opcionBusqueda === 'Imagenes' ? "btn btn-selected" : "btn btn-primary"} 
                        value="Imagenes"
                        onClick={this.onChangeType}
                    />
                </div>
                <br />
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
                    {contents}
                </div>                
            </div>            
        );
    }

    onChangeValue(event) {
        var elementoBusqueda = event.target.value;
        this.setState({ busqueda: elementoBusqueda });
        if (elementoBusqueda === "") {
            this.setState({ searchResult: [], tableResult: [], tableResultVideo: [], tableResultImage: [], loading: true });
        }
    }

    onChangeType(event) {
        var cambio = event.target.value;
        this.setState({ opcionBusqueda: cambio});
        console.log(this.state.opcionBusqueda);
    }

    async buscaElemento() {
        console.log(this.state.busqueda);

        if (this.state.busqueda != "") {

            const response = await fetch('search/' + this.state.busqueda);
            const data = await response.json();
            this.setState({ searchResult: data, loading: false });

            if (data.webPages === "" || data.webPages === undefined || data.webPages === null) {
                this.setState({ tableResult: [] });
            } else {
                this.setState({ tableResult: data.webPages.value });
            }

            if (data.videos === "" || data.videos === undefined || data.videos === null) {
                this.setState({ tableResultVideo: [] });
            } else {
                this.setState({ tableResultVideo: data.videos.value });
            }

            if (data.images === "" || data.images === undefined || data.images === null) {
                this.setState({ tableResultImage: [] });
            } else {
                this.setState({ tableResultImage: data.images.value });
            }

            //<SearchVideos busquedaOri={resultVideo} />
            //<SearchImages busquedaOri={resultImage} />
            
            console.log("final " + data);


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
