import React, { Component } from 'react';

export class LocationList extends Component {
    static displayName = LocationList.name;

    constructor(props) {
        super(props);
        this.state = { externaldata: [], loading: true };
    }

    componentDidMount() {
        this.populateExternalData('https://challengeyuxtibackpm.azurewebsites.net/locations/csv');
    }

    static renderForecastsTable(externaldata) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Disponible desde</th>
                        <th>Disponible hasta</th>
                    </tr>
                </thead>
                <tbody>
                    {externaldata.map(externaldata =>
                        <tr key={externaldata.Id}>
                            <td>{externaldata.Id}</td>
                            <td>{externaldata.Name}</td>
                            <td>{externaldata.InitialAvailability}</td>
                            <td>{externaldata.FinalAvailability}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LocationList.renderForecastsTable(this.state.externaldata.locationList);

        return (
            <div>
                <h1 id="tabelLabel" >Disponibilidad de Ubicaciones</h1>
                <p>Lista de Ubicaciones por disonibilidad</p>
                {contents}
            </div>
        );
    }

    async populateExternalData(url) {
        const response = await fetch(url);
        const data = await response.json();
        //this.setState({ externalData: data });
        this.setState({ externaldata: data, loading: false });
        console.log(data);
    }
}