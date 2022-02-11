using Challenge_Back.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge_Back.Strategies
{
    public class Context
    {
        private ILocation _strategy;

        public Context()
        { }

        public Context(ILocation strategy)
        {
            this._strategy = strategy;
        }

        public void SetStrategy(ILocation strategy)
        {
            this._strategy = strategy;
        }

        public JsonResult GetJsonResult()
        {
            var result = this._strategy.GetLocations();

            JsonResult jsonResult = new JsonResult(result);

            return jsonResult;
        }
    }
}
