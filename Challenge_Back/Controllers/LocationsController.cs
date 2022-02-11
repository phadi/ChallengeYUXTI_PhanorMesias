using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Challenge_Back.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Challenge_Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        // GET: api/<LocationsController>
        [HttpGet]
        public JsonResult Get()
        {
            List<Location> locations = new List<Location>();
            Location location = new Location();
            location.Name = "Name 1";
            location.Availability = 15;
            locations.Add(location);

            JsonResult jsonResult = new JsonResult(locations);
            jsonResult.StatusCode = (int)System.Net.HttpStatusCode.OK;
            //HttpResponseMessage resp = new HttpResponseMessage();resp.

            //Console.WriteLine(jsonResult);
            return jsonResult;
        }

        // GET api/<LocationsController>/5
        [HttpGet("{messageType}")]
        public string Get(string messageType)
        {
            return "value " + messageType;
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
