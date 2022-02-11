using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Models
{
    public sealed class ResponseMessage
    {
        private readonly static ResponseMessage _instance = new ResponseMessage();

        private ResponseMessage()
        {
        }

        public static ResponseMessage Instance
        {
            get
            {
                return _instance;
            }
        }

        public int statuCode { get; set; }

        public string message { get; set; }

        public List<Location> locationList { get; set; }
    }
}
