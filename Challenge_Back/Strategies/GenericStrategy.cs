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
        public List<Location> GetLocations()
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
    }
} 