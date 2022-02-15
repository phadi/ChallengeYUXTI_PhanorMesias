import React, { Component, useEffect, useState } from 'react';

export class SearchWeb extends Component {
    static displayName = SearchWeb.name;

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
        );
    }

    render() {
        let contents = SearchWeb.renderSearchResult(this.state.tableResult);
        return (
            <div>
                <h3>BUSQUEDA POR WEBSITES</h3>
                {contents}
            </div>
        );
    }

    async buscaElemento(query) {
        console.log("IMAGENES..." + query);
        this.setState({ tableResult: [] });
        if (!(query === "" || query === undefined || query === null )) {
            this.setState({ tableResult: query.value });
            console.log(query);
        }
    }
}