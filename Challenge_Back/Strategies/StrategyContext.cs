using Challenge_Back.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Challenge_Back.Strategies
{
    public class StrategyContext
    {
        private ILocation _strategy;

        public StrategyContext()
        { }

        public StrategyContext(ILocation strategy)
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
