using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Games
{
    public class GameDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Category { get; set; }
        public string Platforms { get; set; }
        public string HostUsername { get; set; }
        public ICollection<Profile> Participants { get; set; }
    }
}