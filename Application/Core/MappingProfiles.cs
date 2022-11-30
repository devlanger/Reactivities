using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Games;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Game, Game>();   

            CreateMap<Game, GameDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Participants
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName)); 

            CreateMap<GameUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s=> s.AppUser.DisplayName))  
                .ForMember(d => d.Username, o => o.MapFrom(s=> s.AppUser.UserName))  
                .ForMember(d => d.Bio, o => o.MapFrom(s=> s.AppUser.Bio));  
        }
    }
}