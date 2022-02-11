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

        public int InitialAvailability { get; set; }
        public int FinalAvailability { get; set; }
    }
}
