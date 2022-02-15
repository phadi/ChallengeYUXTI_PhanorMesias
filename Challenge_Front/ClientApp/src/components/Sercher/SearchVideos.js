import React, { Component, useEffect, useState } from 'react';

export class SearchVideos extends Component {
    static displayName = SearchVideos.name;

    constructor(props) {
        super(props);
        this.state = {
            tableResult: []
        };
    }

    componentDidMount() {
        this.buscaElemento(this.props.busquedaOri);
    }

    static renderSearchResult(searchResult) {
        return (
            <table className='table table-striped' aria-labelledby="locationTable">
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Descripcion</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map(searchResult =>
                        <tr key={searchResult.webSearchUrl}>
                            <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.name}</a></td>
                            <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.description}</a></td>
                            <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.contentUrl}</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = SearchVideos.renderSearchResult(this.state.tableResult);
        return (
            <div>
                <h3>BUSQUEDA POR VIDEOS</h3>
                {contents}
            </div>
        );        
    }

    async buscaElemento(query) {
        console.log("VIDEOS..." + query);
        this.setState({ tableResult: [] });
        if (query != "") {
            this.setState({ tableResult: query.value });
            
        }
    }
}