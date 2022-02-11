using Challenge_Back.ModelsDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? InitialAvailability { get; set; }
        public int? FinalAvailability { get; set; }

        public static List<Location> ConvertToLocationList(List<LocationDb> dbList)
        {
            List<Location> locationList = new List<Location>();
            foreach (LocationDb item in dbList)
            {
                Location location = ConvertToLocation(item);
                locationList.Add(location);
            }

            return locationList;
        }

        public static Location ConvertToLocation(LocationDb locationDb)
        {
            Location location = new Location();
            location.Id = locationDb.Id;
            location.Name = locationDb.Name;
            location.InitialAvailability = locationDb.InitialAvailability;
            location.FinalAvailability = locationDb.FinalAvailability;
            return location;
        }

        public static List<LocationDb> ConvertFromLocationList(List<Location> list)
        {
            List<LocationDb> locationList = new List<LocationDb>();
            foreach (Location item in list)
            {
                LocationDb location = ConvertFromLocation(item);
                locationList.Add(location);
            }

            return locationList;
        }

        public static LocationDb ConvertFromLocation(Location location)
        {
            LocationDb locationDb = new LocationDb();
            locationDb.Id = location.Id;
            locationDb.Name = location.Name;
            locationDb.InitialAvailability = location.InitialAvailability;
            locationDb.FinalAvailability = location.FinalAvailability;
            return locationDb;
        }
    }
}
