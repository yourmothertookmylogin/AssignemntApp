using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AssignemntApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AreaController : ControllerBase
    {
        private readonly ILogger<AreaController> _logger;
        private readonly Open511Service _open511Service;

        public AreaController(ILogger<AreaController> logger, Open511Service open511Service)
        {
            _logger = logger;
            _open511Service = open511Service;
        }

        [HttpGet]
        public ContentResult Get()
        {
            try
            {
                var result = _open511Service.GetAreas().Result;
                return Content(result, "application/json");
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error caught while querying areas");
                return null;
            }
        }
    }
}
