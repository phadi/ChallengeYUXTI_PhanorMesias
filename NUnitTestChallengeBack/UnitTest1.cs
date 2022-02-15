using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using Challenge_Back.ModelsDB;
using Challenge_Back.Strategies;
using NUnit.Framework;
using System.Collections.Generic;

namespace NUnitTestChallengeBack
{
    public class Tests
    {
        GenericStrategy _genericStrategy;
        CsvFileStrategy _csvFileStrategy;
        DatabaseStrategy _databaseStrategy;

        [SetUp]
        public void Setup()
        {
            _genericStrategy = new GenericStrategy();
            _csvFileStrategy = new CsvFileStrategy("https://www.Familiadedios.somee.com/LocationsExample.csv");
            _databaseStrategy = new DatabaseStrategy("Server=tcp:phadiserver.database.windows.net,1433;Initial Catalog=ChallengeYuxiPM;Persist Security Info=False;User ID=phadi;Password=Chacho410*;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30");            
        }

        [Test]
        public void GenericStrategyTest()
        {
            StrategiesTest(_genericStrategy, "Localizaciones leidas en codigo", 5, 1);
        }

        [Test]
        public void CSVStrategyTest()
        {
            StrategiesTest(_csvFileStrategy, "Archivo .csv leido desde FTP", 14, 2);
        }

        [Test]
        public void DatabaseStrategyTest()
        {
            StrategiesTest(_databaseStrategy, "Localizaciones leidas desde base de datos", 6, 3);
        }

        private void StrategiesTest(ILocation iLocation, string message, int locationsCount, int locationsByRangeCount)
        {
            string msg = iLocation.GetMessage();
            Assert.AreEqual(msg, message);

            List<Location> locations = new List<Location>();
            locations = iLocation.GetLocations();

            Assert.AreEqual(locations.Count, locationsCount);

            locations = iLocation.GetLocationsByRange(10, 13);

            Assert.AreEqual(locations.Count, locationsByRangeCount);
        }
    }
}
