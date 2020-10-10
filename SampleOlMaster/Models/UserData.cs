using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SampleOlMaster.Models
{
    public class UserData
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public List<decimal> Coordinates { get; set; }
        
    }
}