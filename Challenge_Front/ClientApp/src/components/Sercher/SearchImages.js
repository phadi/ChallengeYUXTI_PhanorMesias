import React, { Component, useEffect, useState } from 'react';

export class SearchImages extends Component {
    static displayName = SearchImages.name;

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
                        <th>Image</th>
                        <th>Name</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map(searchResult =>
                        <tr key={searchResult.webSearchUrl}>
                            <td><a href={searchResult.contentUrl} target="_blank"> <img src={searchResult.contentUrl} width="30" height="30" /></a></td>
                            <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.name}</a></td>
                            <td><a href={searchResult.contentUrl} target="_blank"> {searchResult.contentUrl}</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = SearchImages.renderSearchResult(this.state.tableResult);
        return (
            <div>
                <h3>BUSQUEDA POR IMAGENES</h3>
                {contents}
            </div>
        );
    }

    async buscaElemento(query) {
        console.log("IMAGENES..." + query);
        this.setState({ tableResult: [] });
        if (!(query === "" || query === undefined || query === null)) {
            this.setState({ tableResult: query.value });
            console.log(query);
        }
    }
}