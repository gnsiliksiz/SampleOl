
using System.Collections.Generic;
using System.IO;

using System.Web.Mvc;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SampleOlMaster.Models;

namespace SampleOlMaster.Controllers
{
    public class HomeController : Controller
    {
        public List<UserData> fileContents;
        public dynamic result = new JObject();
        //Application Path
        public string pathh = System.Web.Hosting.HostingEnvironment.MapPath(System.Web.HttpRuntime.AppDomainAppVirtualPath) + "maps.json";
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult PostAllSave(UserData userData)
        {


            bool rslt = false;

            JArray array = new JArray();

            //Userdata serialize deseialize
            dynamic serialize = JsonConvert.SerializeObject(userData, Formatting.Indented);
            dynamic deserialize = JsonConvert.DeserializeObject(serialize);

            //Maps.json file Read
            using (StreamReader sr = new StreamReader(pathh))
            {
                fileContents = JsonConvert.DeserializeObject<List<UserData>>(sr.ReadToEnd());
            }
            if (fileContents != null)
            {
                foreach (var item in fileContents)
                {
                    array.Add(new JObject(
                        new JProperty("Name", item.Name),
                        new JProperty("Number", item.Number),
                        new JProperty("Coordinates", item.Coordinates)));
                }
            }
            //userData add array
            array.Add(deserialize);

            //File contents clear
            System.IO.File.WriteAllText(pathh, string.Empty);
            //Maps.json write data
            if (pathh != null || pathh != "")
            {
                using (var writer = new StreamWriter(pathh, true))
                {
                    writer.Write(JsonConvert.SerializeObject(array, Formatting.Indented));
                    rslt = true;

                }
            }
            result.success = rslt;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetAllData()
        {

            JObject data = new JObject();
            JArray array = new JArray();
            if (pathh != null || pathh != "")
            {
                using (StreamReader sr = new StreamReader(pathh))
                {
                    fileContents = JsonConvert.DeserializeObject<List<UserData>>(sr.ReadToEnd());
                }
            }
            if (fileContents != null)
            {
                foreach (var item in fileContents)
                {

                    array.Add(new JObject(new JProperty("Name", item.Name),
                                          new JProperty("Number", item.Number),
                                          new JProperty("Coordinates", item.Coordinates)));


                }
            }
            data.Add(new JProperty("data", array));
            return Json(new { data = JsonConvert.SerializeObject(data) }, JsonRequestBehavior.AllowGet);
        }



    }
}