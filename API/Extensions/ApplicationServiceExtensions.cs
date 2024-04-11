using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SingalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        //config below refers to appsettings.Development.json
        public static IServiceCollection AddApplicationservice(this IServiceCollection services, IConfiguration config)
        {
            // add scoped is scoped till the lifetime of the HTTP request
            // in this case because we're using this service inside an APIcontroller when a request comes in and
            // we have this service injected into that particular controller then a new instance of this service is created and
            // when the request is finished the service is disposed so this is the one that we're going to use almost all the time
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            services.AddScoped<ITokenService, TokenService>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                // options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddSingleton<PresenceTracker>();

            return services;
        }

    }
}
