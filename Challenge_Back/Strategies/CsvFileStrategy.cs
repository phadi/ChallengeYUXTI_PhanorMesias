using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class CsvFileStrategy : ILocation
    {
        string _path;
        public CsvFileStrategy()
        {
            //string fileName = "Documents/LocationsExample.csv";
            //_path = Path.GetFullPath(fileName);
            _path = "Documents/LocationsExample.csv";//D:/Phanor/Challenge/ChallengeYUXTI_PhanorMesias/Challenge_Back
        }
        public CsvFileStrategy(string path)
        {
            _path = path;
        }

        public List<Location> GetLocations()
        {
            List<Location> locations = GetTotalLocations();
            return locations;
        }

        private List<Location> GetTotalLocations()
        {
            List<Location> locations = new List<Location>();
            string csvData = File.ReadAllText(_path);
            foreach (string row in csvData.Split("\r\n"))
            {
                if (!string.IsNullOrEmpty(row))
                {
                    string[] line = row.Split(";");
                    locations.Add(new Location
                    {
                        Id = Convert.ToInt32(line[0]),
                        Name = line[1],
                        InitialAvailability = Convert.ToInt32(line[2]),
                        FinalAvailability = Convert.ToInt32(line[3])
                    });
                }
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
