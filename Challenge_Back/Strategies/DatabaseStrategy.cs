using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using Challenge_Back.ModelsDB;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class DatabaseStrategy : ILocation
    {
        private readonly ChallengeYuxiPMContext db = new ChallengeYuxiPMContext();

        public List<Location> GetLocations()
        {
            try
            {
                List<LocationDb> locationsDb = db.LocationDb.ToList();
                List<Location> locations = Location.ConvertToLocationList(locationsDb);
                return locations;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public void AddLocations(List<Location> locations)
        {
            try
            {
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
