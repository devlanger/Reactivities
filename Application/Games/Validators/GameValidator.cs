using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Games
{
    public class GameValidator : AbstractValidator<Game>
    {
        public GameValidator()
        {
            RuleFor(g => g.Title).NotEmpty();
            RuleFor(g => g.Category).NotEmpty();
            RuleFor(g => g.Description).NotEmpty();
            RuleFor(g => g.Platforms).NotEmpty();
            RuleFor(g => g.ReleaseDate).NotEmpty();
        }
    }
}