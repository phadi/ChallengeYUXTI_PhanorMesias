using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Challenge_Front.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        static string host = "https://api.bing.microsoft.com";
        static string path = "/v7.0/search";
        static string market = "en-US";
        static string key = "3d2977816c3542fa8ff38c5d7be33204";

        // GET api/<SearchController>/5
        [HttpGet("{query}")]
        public Task<string> Get(string query)
        {
            return SearchAsync(query);
        }

        public async Task<string> SearchAsync(string query)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", key);
            string uri = host + path + "?mkt=" + market + "&q=" + System.Net.WebUtility.UrlEncode(query);
            HttpResponseMessage response = await client.GetAsync(uri);
            string contentString = await response.Content.ReadAsStringAsync();
            dynamic parsedJson = JsonConvert.DeserializeObject(contentString);

            return contentString;
        }
    }
}
