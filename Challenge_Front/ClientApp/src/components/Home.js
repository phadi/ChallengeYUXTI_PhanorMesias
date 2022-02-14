import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>PHANOR MESIAS</h1>
        <p>FullStack Developer</p>
        <p>Prueba tecnica para YUXI como full stack developer. EL reto consiste en una aplicacion para fron y una para back:</p>
        <ul>
            <li>El Back es una aplicacion web de .NET core 3.1
                <p>Se encuentra publicada en Azure: <a href='https://challengeyuxtibackpm.azurewebsites.net/locations' target='_blank'>https://challengeyuxtibackpm.azurewebsites.net</a></p>
            </li>
            <li>EL front esta desarrollado con pla plantilla de .Net para React.
                    <p>Se encuentra publicada en Azure: <a href='https://challengeyuxtifrontpm.azurewebsites.net' target='_blank'>https://challengeyuxtifrontpm.azurewebsites.net</a></p>
            </li>
        </ul>        
      </div>
    );
  }
}
