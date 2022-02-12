import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    //const[usuarios, setUsuarios] = useState([]);
    //const[tablaUsuarios, setTablaUsuarios] = useState([]);
    //const[busqueda, setBusqueda] = useState("");

  constructor(props) {
    super(props);
      this.state = { externaldata: [], loading: true };
  }

  componentDidMount() {
     // this.populateWeatherData();
      this.populateExternalData();
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
        : FetchData.renderForecastsTable(this.state.externaldata.locationList);

    return (
      <div>
        <h1 id="tabelLabel" >Disponibilida de Ubicaciones</h1>
        <p>Lista de Ubicaciones por disonibilidad</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
    }

    async populateExternalData() {
        const response = await fetch('https://challengeyuxtibackpm.azurewebsites.net/locations/csv');
        //('https://jsonplaceholder.typicode.com/users');
        //('https://bingwebsearchpm.cognitiveservices.azure.com/');//
        const data = await response.json();
        //this.setState({ externalData: data });
        this.setState({ externaldata: data, loading: false });
        console.log(data);
    }
}
