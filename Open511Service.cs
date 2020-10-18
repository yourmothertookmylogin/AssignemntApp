using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace AssignemntApp
{
    public class Open511Service
    {
        public HttpClient Client { get; }

        public Open511Service(HttpClient client)
        {
            client.BaseAddress = new Uri("https://api.open511.gov.bc.ca/");
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            client.DefaultRequestHeaders.Add("User-Agent", "HttpClientFactory");

            Client = client;
        }

        public async Task<string> GetAreas()
        {
            var response = await Client.GetAsync("/areas?format=json");
            try
            {
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            }
            catch
            {
                return string.Empty;
            }
        }

        public async Task<string> GetEvents(
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
            , string limit = null)
        {
            if (!string.IsNullOrEmpty(status))
                status = $"&status={System.Net.WebUtility.UrlEncode(status)}";
            if (!string.IsNullOrEmpty(severity))
                severity = $"&severity={System.Net.WebUtility.UrlEncode(severity)}";
            if (!string.IsNullOrEmpty(jusrisdiction))
                jusrisdiction = $"&jusrisdiction={System.Net.WebUtility.UrlEncode(jusrisdiction)}";
            if (!string.IsNullOrEmpty(event_type))
                event_type = $"&event_type={System.Net.WebUtility.UrlEncode(event_type)}";
            if (!string.IsNullOrEmpty(created))
                created = $"&created={System.Net.WebUtility.UrlEncode(created)}";
            if (!string.IsNullOrEmpty(updated))
                updated = $"&updated={System.Net.WebUtility.UrlEncode(updated)}";
            if (!string.IsNullOrEmpty(updated))
                updated = $"&updated={System.Net.WebUtility.UrlEncode(updated)}";
            if (!string.IsNullOrEmpty(road_name))
                road_name = $"&road_name={System.Net.WebUtility.UrlEncode(road_name)}";
            if (!string.IsNullOrEmpty(area_id))
                area_id = $"&area_id={System.Net.WebUtility.UrlEncode(area_id)}";
            if (!string.IsNullOrEmpty(bbox))
                bbox = $"&bbox={System.Net.WebUtility.UrlEncode(bbox)}";
            if (!string.IsNullOrEmpty(offset))
                offset = $"&offset={System.Net.WebUtility.UrlEncode(offset)}";
            if (!string.IsNullOrEmpty(limit))
                offset = $"&limit={System.Net.WebUtility.UrlEncode(limit)}";
            try
            {
                string url = $"/events?format=json{status}{severity}{jusrisdiction}{event_type}{created}{updated}{road_name}{area_id}{bbox}{offset}{limit}";
                var response = await Client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            } 
            catch
            {
                return string.Empty;
            }
        }
    }
}
