// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
const colors = require('colors')
require('dotenv').config();
const DeleteFile = require('../utils/deleteFile');
const { v4: uuidv4 } = require('uuid');
const Name = process.env.NAME_CLOUD
const PUBLIC_API = process.env.PUBLIC_API_CLOUD
const SECRET_API = process.env.SECRET_API_CLOUD

cloudinary.config({
  secure: true,
  api_key: PUBLIC_API,
  cloud_name: Name,
  api_secret: SECRET_API
});


exports.uploadVideo = async (pathVideo) => {
  console.log(pathVideo[0].path);
  try {
    const result = await cloudinary.uploader.upload(pathVideo[0].path,{
      resource_type: 'video',
      public_id: uuidv4(),
    })
    await DeleteFile(pathVideo[0].filename, 'video')
    return {
      videoId : result.public_id,
      url: result.secure_url
    }
  } catch (error) {
    console.log(colors.red(error));
  }
}

exports.DeleteFileVideo = async (id) => {
  // const videoExists = await cloudinary.api.resource(id);
  // console.log('video exist'.red,videoExists);
  try {

    const results = await cloudinary.api.delete_resources([id], { type: 'upload', resource_type: 'video' },
    (result, error) => {
      console.log(colors.green(result))
    })

   console.log(colors.yellow(results))
  } catch (error) {
   console.log( "error delete video".red ,colors.red(error))
  }
}