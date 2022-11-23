using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Games.Any()) return;
            
            var games = new List<Game>
            {
                new Game
                {
                    Title = "Past Game 1",
                    ReleaseDate = DateTime.Now.AddMonths(-2),
                    Description = "Game 2 months ago",
                    Category = "RPG",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Past Game 2",
                    ReleaseDate = DateTime.Now.AddMonths(-1),
                    Description = "Game 1 month ago",
                    Category = "FPS",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 1",
                    ReleaseDate = DateTime.Now.AddMonths(1),
                    Description = "Game 1 month in future",
                    Category = "Strategy",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 2",
                    ReleaseDate = DateTime.Now.AddMonths(2),
                    Description = "Game 2 months in future",
                    Category = "Strategy",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 3",
                    ReleaseDate = DateTime.Now.AddMonths(3),
                    Description = "Game 3 months in future",
                    Category = "Strategy",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 4",
                    ReleaseDate = DateTime.Now.AddMonths(4),
                    Description = "Game 4 months in future",
                    Category = "Horror",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 5",
                    ReleaseDate = DateTime.Now.AddMonths(5),
                    Description = "Game 5 months in future",
                    Category = "Adventure",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 6",
                    ReleaseDate = DateTime.Now.AddMonths(6),
                    Description = "Game 6 months in future",
                    Category = "RPG",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 7",
                    ReleaseDate = DateTime.Now.AddMonths(7),
                    Description = "Game 2 months ago",
                    Category = "FPS",
                    Platforms = "PC",
                },
                new Game
                {
                    Title = "Future Game 8",
                    ReleaseDate = DateTime.Now.AddMonths(8),
                    Description = "Game 8 months in future",
                    Category = "Adventure",
                    Platforms = "PC",
                }
            };

            await context.Games.AddRangeAsync(games);
            await context.SaveChangesAsync();
        }
    }
}