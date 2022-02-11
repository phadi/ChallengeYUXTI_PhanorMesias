using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Challenge_Back.Factory;
using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

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
        [HttpGet("byType")]
        public string Get(string messageType)
        {
            return GetResponse(messageType);
        }

        /// <summary>
        /// Obtiene lista de localizacion de acuerdo al tipo de mensaje de <paramref name="messageType"/> 
        /// Y puede definir la ruta del archivo .csv con <paramref name="path"/>
        /// </summary>
        /// <param name="messageType"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        /// 
        [HttpGet("byPath")]
        public string Get(string messageType, string path)
        {
            return GetResponse(messageType, path);
        }

        private static string GetResponse(string messageType = null, string path = null)
        {
            try
            {
                ILocation location = Creator.InstanceLocation(messageType, path);
                ResponseMessage.Instance.locationList = location.GetLocations();
                ResponseMessage.Instance.statuCode = (int)System.Net.HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                ResponseMessage.Instance.statuCode = (int)System.Net.HttpStatusCode.InternalServerError;
                ResponseMessage.Instance.message = ex.Message;
            }

            string response = JsonSerializer.Serialize(ResponseMessage.Instance);
            return response;
        }

        // POST api/<LocationsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
