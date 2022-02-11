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
        /// Obtiene lista total de Localizaciones 
        /// </summary>
        /// <returns></returns>
        List<Location> GetLocations();

        /// <summary>
        /// Obtiene lista de localicacion con disponibilidad desde <paramref name="from"/> hast <paramref name="to"/>
        /// </summary>
        /// <returns></returns>
        List<Location> GetLocationsByRange(int from, int to);

        /// <summary>
        /// Agrega localización a la lista
        /// </summary>
        void AddLocationsAsync(string locations);
    }
}
