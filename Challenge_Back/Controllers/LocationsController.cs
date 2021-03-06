using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Challenge_Back.Factory;
using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using Challenge_Back.ModelsDB;
using Challenge_Back.Strategies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Challenge_Back.Controllers
{
    /// <summary>
    /// Clase controlador para manejar API's de localización
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public LocationsController(IConfiguration configuration)
        {
            var connection = configuration.GetConnectionString("BdLocationDBContext");
            ChallengeYuxiPMContext.Configuration = configuration;
            CsvFileStrategy.Configuration = configuration;
        }

        /// <summary>
        /// Obtiene una lista de localizaciones generica
        /// </summary>
        /// <returns>Respuesta json con lista de localizaciones</returns>
        [HttpGet]
        public string Get()
        {
            return GetResponse();
        }

        /// <summary>
        /// Obtiene lista de localizacion de acuerdo al tipo de mensaje de <paramref name="messageType"/>
        /// </summary>
        /// <param name="messageType">Tipo de mensaje a devolver</param>
        /// <returns>Respuesta json con lista de localizaciones de acuerdo al tipo de mensaje</returns>
        [HttpGet("{messageType}")]
        public string Get(string messageType)
        {
            return GetResponse(messageType);
        }

        /// <summary>
        /// Obtiene lista de localizacion de acuerdo al tipo de mensaje de <paramref name="messageType"/> 
        /// Y puede definir la ruta del archivo .csv con <paramref name="path"/>
        /// Ejemplo ../locations/byPath?messageType=csv&path=https://www.Familiadedios.somee.com/LocationsExample.csv
        /// </summary>
        /// <param name="messageType">Tipo de mensaje a devolver</param>
        /// <param name="path">Ruta del archivo csv</param>
        /// <returns>Respuesta json con lista de localizaciones de acuerdo al tipo de mensaje y al path</returns>
        [HttpGet("byPath")]
        public string Get(string messageType, string path)
        {
            return GetResponse(messageType, path);
        }

        /// <summary>
        /// Obtiene lista de localizacion de acuerdo al tipo de mensaje de <paramref name="messageType"/>
        /// en el rango desde <paramref name="from"/> hasta <paramref name="to"/>
        /// Ejemplo: ../locations/byRange?messageType=csv&from=10&to=13
        /// </summary>
        /// <param name="messageType">Tipo de mensaje a devolver</param>
        /// <param name="from">Rango inicial</param>
        /// <param name="to">Rango final</param>
        /// <param name="path">Ruta del archivo csv</param>
        /// <returns></returns>
        [HttpGet("byRange")]
        public string Get(string messageType, int from, int to, string path = null)
        {            
            return GetResponse(messageType, path, 2, from, to);
        }

        private string GetResponse(string messageType = null, string path = null, int type = 1, int from = 8, int to = 18)
        {
            try
            {
                ILocation location = Creator.InstanceLocation(messageType, path);
                switch (type)
                {
                    case 1: ResponseMessage.Instance.locationList = location.GetLocations();
                        break;
                    case 2: ResponseMessage.Instance.locationList = location.GetLocationsByRange(from, to);
                        break;
                }
                
                ResponseMessage.Instance.statuCode = (int)System.Net.HttpStatusCode.OK;
                ResponseMessage.Instance.message = location.GetMessage();
            }
            catch (Exception ex)
            {
                ResponseMessage.Instance.statuCode = (int)System.Net.HttpStatusCode.InternalServerError;
                ResponseMessage.Instance.message = ex.Message;
                ResponseMessage.Instance.locationList = null;
            }

            string response = JsonSerializer.Serialize(ResponseMessage.Instance);
            return response;
        }

        /// <summary>
        /// Create Location
        /// </summary>
        /// <param name="messageType">Defines if location is created in DB o CSV file</param>
        /// <param name="value">Location data to create</param>
        [HttpPost("{messageType}")]
        public HttpResponseMessage Post(string messageType, [FromBody] string value)
        {
            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                ILocation location = Creator.InstanceLocation(messageType);
                location.AddLocationsAsync(value);

                response.StatusCode = System.Net.HttpStatusCode.Created;
            }
            catch (Exception ex)
            {
                response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                response.ReasonPhrase = ex.Message;
            }

            return response;
        }

        // PUT api/<LocationsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LocationsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
