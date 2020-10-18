using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace AssignemntApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<EventController> _logger;
        private readonly Open511Service _open511Service;

        public EventController(ILogger<EventController> logger, Open511Service open511Service)
        {
            _logger = logger;
            _open511Service = open511Service;
        }
        [HttpGet]
        public ContentResult Get(
            string status = null
            , string severity = null
            , string jusrisdiction = null
            , string event_type = null
            , string created = null
            , string updated = null
            , string road_name = null
            , string area_id = null
            , string bbox = null
            , string offset = null
            , string limit = null
            )
        {
            try {
                var result = _open511Service.GetEvents(status, severity, jusrisdiction, event_type, created, updated, road_name, area_id, bbox, offset, limit).Result;
                return Content(result, "application/json"); ;
            } 
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error caught while querying events");
                return null;
            }
        }
    }
}
