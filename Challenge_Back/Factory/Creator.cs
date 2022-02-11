using Challenge_Back.Interfaces;
using Challenge_Back.Strategies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Factory
{
    /// <summary>
    /// Clase factory para instanciar interfaces
    /// </summary>
    public static class Creator
    {
        /// <summary>
        /// Creador de instancias para interfaz ILocation
        /// </summary>
        /// <param name="messageType">Tipo de mensaje que define la instancia de ILocation</param>
        /// <returns>INstancia de clase que implemente ILocation</returns>
        public static ILocation InstanceLocation(string messageType, string path = null)
        {
            switch (messageType)
            {
                case "csv":
                    if (string.IsNullOrEmpty(path))
                    {
                        return new CsvFileStrategy();
                    }
                    else
                    {
                        return new CsvFileStrategy(path);
                    }
                    
                case "db": return new DatabaseStrategy();
                default: return new GenericStrategy();
            } 
        }
    }
}
