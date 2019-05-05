using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;



namespace Socket.io.server
{
  [JsonObject(MemberSerialization.OptIn)]
  public class Part
  {
    [JsonProperty]
    public string PartNumber { get; set; }

    [JsonProperty]
    public string Code { get; set; }

    [JsonProperty]
    public int Level { get; set; }

    public Part()
    {
    }

    public string ToJsonString()
    {
      return JsonConvert.SerializeObject(this);
    }
    public static Part Deserialize(string jsonString)
    {
      return JsonConvert.DeserializeObject<Part>(jsonString);
    }
  }
}
