using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class GameUser
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid GameId {get; set;}
        public Game Game {get; set;}
        public bool IsHost{get;set;}
    }
}