using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Game
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Category { get; set; }
        public string Platforms { get; set; }
        public bool IsFinished { get; set; }
        public ICollection<GameUser> Participants { get; set; } = new List<GameUser>();
    }
}