using Challenge_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Interfaces
{
    public interface ILocation
    {
        /// <summary>
        /// Obtien lista total de Localizaciones 
        /// </summary>
        /// <returns></returns>
        List<Location> GetLocations();

        /// <summary>
        /// Agrega localización a la lista
        /// </summary>
        void AddLocations(List<Location> locations);
    }
}
