﻿using Challenge_Back.Interfaces;
using Challenge_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class DatabaseStrategy : ILocation
    {
        public List<Location> GetLocations()
        {
            List<Location> locations = new List<Location>();

            return locations;
        }
    }
}