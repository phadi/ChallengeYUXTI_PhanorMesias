import React, { Component } from 'react';


export class LocationList extends Component {
    static displayName = LocationList.name;

    constructor(props) {
        super(props);
        this.state = {
            locationList: [],
            locationListTotal: [],
            externaldata: [],
            externaldataCsv: [],
            externaldataDb: [],
            externaldataGen: [],
            loading: true,
            locationOption: "",
            busquedaFinal: "",
            busquedaInicial: ""            
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.filterAviability = this.filterAviability.bind(this);
        this.filterAviabilityFinal = this.filterAviabilityFinal.bind(this);
    }

    componentDidMount() {
        this.setState({ locationOption: 'csv' });
        this.populateExternalData();
    }

    static renderForecastsTable(externaldata) {
        return (
            <table className='table table-striped' aria-labelledby="locationTable">
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
            : LocationList.renderForecastsTable(this.state.locationList);

        return (
            <div>
                <h1 id="locationTable">Disponibilidad de Ubicaciones</h1>
                <div>
                    <input type="radio" value="generic" onChange={this.onChangeValue} checked={this.state.locationOption === 'generic'} name="generic" /> Generic <span></span> <br/>
                    <input type="radio" value="csv" onChange={this.onChangeValue} checked={this.state.locationOption === 'csv'} name="csv" /> .CSV <span></span> <br />
                    <input type="radio" value="db" onChange={this.onChangeValue} checked={this.state.locationOption === 'db'} name="db" /> Database <span></span> <br />
                    <br />
                    
                    <label>
                        Filtro disponibilidad Inicial:
                        <input type="text"
                            className="form-control inputBuscar"
                            placeholder="Disponibilidad Inicial"
                            value={this.state.busquedaInicial}
                            onChange={this.filterAviability} />
                    </label>
                    <label>
                        Filtro disponibilidad Final:
                        <input type="text"
                            className="form-control inputBuscar"
                            placeholder="Disponibilidad Final"
                            value={this.state.busquedaFinal}
                            onChange={this.filterAviabilityFinal}/>
                    </label>
                </div>
                <br />
                <p>Lista de Ubicaciones por disonibilidad</p>
                {contents}
            </div>
        );
    }

    onChangeValue(event) {
        this.setState({ locationOption: event.target.value });

        switch (event.target.value) {
            case 'csv':
                this.setState({ locationList: this.state.externaldataCsv.locationList, locationListTotal: this.state.externaldataCsv.locationList, externaldata: this.state.externaldataCsv, loading: false });
                break;
            case 'db':
                this.setState({ locationList: this.state.externaldataDb.locationList, locationListTotal: this.state.externaldataDb.locationList, externaldata: this.state.externaldataDb, loading: false });
                break;
            case 'generic':
                this.setState({ locationList: this.state.externaldataGen.locationList, locationListTotal: this.state.externaldataGen.locationList, externaldata: this.state.externaldataGen, loading: false });
                break;
            default:
                this.setState({ locationList: this.state.externaldataCsv.locationList, locationListTotal: this.state.externaldataCsv.locationList, externaldata: this.state.externaldataCsv, loading: false });
                break;
        }        
    }

    async populateExternalData() {
        const responseCsv = await fetch('https://challengeyuxtibackpm.azurewebsites.net/locations/csv');
        const dataCsv = await responseCsv.json();;
        
        const responseDb = await fetch('https://challengeyuxtibackpm.azurewebsites.net/locations/db');
        const dataDb = await responseDb.json();

        const responseGen = await fetch('https://challengeyuxtibackpm.azurewebsites.net/locations/generic');
        const dataGen = await responseGen.json();

        this.setState({ locationList: dataCsv.locationList, locationListTotal: dataCsv.locationList, externaldata: dataCsv, externaldataCsv: dataCsv, externaldataDb: dataDb, externaldataGen: dataGen, loading: false });
    }

    filterAviability(event) {
        
        var elementoBusqueda = event.target.value;
        var filtro = this.state.locationListTotal.filter((elemento) => {
            if (elemento.InitialAvailability >= elementoBusqueda) {
                return elemento;
            }
        });

        this.setState({ locationList: filtro, busquedaInicial: elementoBusqueda, busquedaFinal: "" });
    }

    filterAviabilityFinal(event) {

        var elementoBusqueda = event.target.value;
        var filtro = [];
        if (this.state.busquedaInicial === "") {
            if (elementoBusqueda === "") {
                filtro = this.state.locationListTotal;
            } else {
                filtro = this.state.locationListTotal.filter((elemento) => {
                    if (elemento.FinalAvailability <= elementoBusqueda) {
                        return elemento;
                    }
                });
            }
        } else {
            if (elementoBusqueda === "") {                
                filtro = this.state.locationListTotal.filter((elemento) => {
                    if (elemento.InitialAvailability >= this.state.busquedaInicial) {
                        return elemento;
                    }
                });
            } else {
                filtro = this.state.locationListTotal.filter((elemento) => {
                    if (elemento.InitialAvailability >= this.state.busquedaInicial
                        && elemento.FinalAvailability <= elementoBusqueda) {
                        return elemento;
                    }
                });
            }            
        }
       
        this.setState({ locationList: filtro, busquedaFinal: elementoBusqueda });
    }
} 