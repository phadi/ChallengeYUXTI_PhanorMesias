# ChallengeYUXTI_PhanorMesias

Prueba técnica presentada por PHANOR MESIAS a YUXI para el cargo de fullstack developer.

Consta de una aplicaion web para el back y una app react para el front.

BACKEND

API web en .NET core 3.1
Lee archivo plano
Conecta con base de datos SQL server (Alojada en AZURE)
GET--- Lista de localizaciones con disponibilidad. Tiene opción de de definir rango de disponibilidad

  AZURE
  
  https://challengeyuxtibackpm.azurewebsites.net/locations
  
  Ejemplo: 
    https://challengeyuxtibackpm.azurewebsites.net/locations     --- Lista generica
    https://challengeyuxtibackpm.azurewebsites.net/locations/csv --- Archivo plano leido de un FTP
    https://challengeyuxtibackpm.azurewebsites.net/locations/db  --- Lista leida de base de datos SQL Server
    https://challengeyuxtibackpm.azurewebsites.net/locations/byPath?messageType=csv&path='RUTA-FTP' --- Archivo plano leido de la ruta FTP proporcionada
    https://challengeyuxtibackpm.azurewebsites.net/locations/byRange?messageType=db&from=10&to=15   --- Lista leida de base de datos SQL Server con disponibuiidad entre 10 - 15

  REPORSITORIO: 

  https://github.com/phadi/ChallengeYUXTI_PhanorMesias/tree/master/Challenge_Back


FRONT

APP reack con opcion de busqueda en BING
PLantilla de .NET Core 3.1 React

  REPORSITORIO: 

  https://github.com/phadi/ChallengeYUXTI_PhanorMesias/tree/master/Challenge_Front
  
  AZURE
  
  https://challengeyuxtifrontpm.azurewebsites.net
  
PRUEBAS UNITARIAS

  REPORSITORIO: 

  https://github.com/phadi/ChallengeYUXTI_PhanorMesias/tree/master/NUnitTestChallengeBack

