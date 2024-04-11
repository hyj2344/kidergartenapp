﻿using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();
        //When the user logs in, the authentication token is created and sent to the browser.
        //The browser then sends the cookie with each subsequent request, allowing the server to identify the user and set User.Identity.IsAuthenticated to true.
        if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

        var userId = resultContext.HttpContext.User.GetUserId();
        //context.HttpContext.RequestServices to gain access to the dependency injection containers（services.AddScoped<IUnitOfWork, UnitOfWork>();）
        var uow = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
        var user = await uow.UserRepository.GetUserByIdAsync(userId);
        user.LastActive = DateTime.UtcNow;
        await uow.Complete();
    }
}
