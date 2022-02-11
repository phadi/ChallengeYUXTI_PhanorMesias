using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class CsvFileStrategy : ILocation
    {
        string _path;
        public CsvFileStrategy()
        {
            _path = "";
        }
        public CsvFileStrategy(string path)
        {
            _path = path;
        }
        public List<Location> GetLocations()
        {
            List<Location> locations = new List<Location>();

            return locations;
        }
    }
}
