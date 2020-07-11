using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Utils.Global.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace back_end {
    public class Startup {

        private const string AllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddCors(options => {
                options.AddPolicy(name: AllowSpecificOrigins,
                    builder => { builder.WithOrigins("http://localhost:4200", "https://localhost:4200"); });
            });
            
            services.AddControllers();
            Action<ApiPaths> apiPaths = paths => paths.WeatherApi = Configuration["ApiPaths:WeatherApi"];
            services.Configure(apiPaths);
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<ApiPaths>>().Value);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(AllowSpecificOrigins);
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}