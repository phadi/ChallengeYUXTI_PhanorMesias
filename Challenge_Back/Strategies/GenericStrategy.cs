using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class GenericStrategy : ILocation
    {
        public string GetMessage()
        {
            return "Localizaciones leidas en codigo";
        }

        public List<Location> GetLocations()
        {
            List<Location> locations = GetTotalLocations();
            return locations;
        }

        private List<Location> GetTotalLocations()
        {
            List<Location> locations = new List<Location>();
            for (int i = 1; i <= 5; i++)
            {
                Location location = new Location();
                location.Id = i;
                location.Name = "Loation " + i;
                location.InitialAvailability = i + 5;

                location.FinalAvailability = 18 - i;

                locations.Add(location);
            }

            return locations;
        }

        public List<Location> GetLocationsByRange(int fromT, int toT)
        {
            try
            {
                List<Location> totalLocations = GetTotalLocations();
                List<Location> locations = (from l in totalLocations
                                            where l.InitialAvailability >= fromT && l.FinalAvailability <= toT
                                            select l).ToList();

                return locations;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void AddLocationsAsync(string locations)
        {
            throw new NotImplementedException();
        }
    }
} 