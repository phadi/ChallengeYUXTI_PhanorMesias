using Challenge_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Interfaces
{
    public interface ILocation
    {
        List<Location> GetLocations();
    }
}
