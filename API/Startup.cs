using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System.Text;
using API.Data;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using API.Extensions;
using API.Middleware;
using API.SingalR;
using API;

namespace KindergartenApp.API
{
    public class Startup
    {
        //config is in appsettings.Development.json
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationservice(_config);
            services.AddControllers();
            services.AddCors();
            services.AddIdentityservices(_config);
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline (middleware. order matters)
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)

        {

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            //app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200"));
            // app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
            //     .WithOrigins("http://Kindergarten-app-2344.s3-website-us-west-2.amazonaws.com"));

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
                .WithOrigins("http://kindergarten-app-2344.s3-website-us-west-2.amazonaws.com", "http://localhost:4200"));
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            //serve index.html in client
            app.UseDefaultFiles();
            //use files in the wwwroot folder
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
                endpoints.MapHub<MessageHub>("hubs/message");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
