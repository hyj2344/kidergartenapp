using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Interfaces
{
    public interface IPhotoService
    {

        public Task<ImageUploadResult> AddPhotoAsync(IFormFile file);


        public Task<DeletionResult> DeletePhotoAsync(string publicId);
}
}
