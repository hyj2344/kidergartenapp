using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        //bacause we have two claims in token service, one is id and another one is name, then we have two methods below
        // var claims = new List<Claim> {
        //         new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
        //         new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
        //     };
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
