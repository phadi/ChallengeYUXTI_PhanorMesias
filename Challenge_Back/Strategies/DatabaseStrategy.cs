using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using Challenge_Back.ModelsDB;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class DatabaseStrategy : ILocation
    {
        private readonly ChallengeYuxiPMContext db = new ChallengeYuxiPMContext();

        public DatabaseStrategy() { }

        public DatabaseStrategy(string conn)
        {
            db = new ChallengeYuxiPMContext(conn);
        }

        public string GetMessage()
        {
            return "Localizaciones leidas desde base de datos";
        }

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

        public List<Location> GetLocationsByRange(int fromT, int toT)
        {
            try
            {
                List<LocationDb> locationDbList = (from l in db.LocationDb
                                                   where l.InitialAvailability >= fromT && l.FinalAvailability <= toT
                                                   select l).ToList();

                List<Location> locations = Location.ConvertToLocationList(locationDbList);

                return locations;
            }
            catch(Exception ex)
            {
                throw ex;
            }            
        }

        public async void AddLocationsAsync(string locationString)
        {
            try
            {
                LocationDb location = JsonConvert.DeserializeObject<LocationDb>(locationString);
                db.LocationDb.Add(location);
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
