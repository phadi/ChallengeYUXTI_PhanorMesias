
using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace Challenge_Back.Strategies
{
    public class CsvFileStrategy : ILocation
    {
        string _path;
        public static IConfiguration Configuration { get; set; }

        public CsvFileStrategy()
        {
            _path = Configuration["FTP:rutaFtp"];
            //"Documents/LocationsExample.csv";//D:/Phanor/Challenge/ChallengeYUXTI_PhanorMesias/Challenge_Back
        }

        public string GetMessage()
        {
            return "Archivo .csv leido desde FTP";
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

            WebRequest request = FtpWebRequest.Create(_path);
            using (WebResponse response = request.GetResponse())
            {
                Stream responseStream = response.GetResponseStream();
                Encoding encode = System.Text.Encoding.GetEncoding("utf-8");
                using (var reader = new StreamReader(responseStream, encode))
                {
                   while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        var values = line.Split(';');
                        locations.Add(new Location
                        {
                            Id = Convert.ToInt32(values[0]),
                            Name = values[1],
                            InitialAvailability = Convert.ToInt32(values[2]),
                            FinalAvailability = Convert.ToInt32(values[3])
                        });
                    }
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
