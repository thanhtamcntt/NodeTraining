require('dotenv').config();
const colors = require('colors')
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const DeleteFile = require('../utils/deleteFile');
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL
const TOKEN_DRIVE = process.env.TOKEN_DRIVE

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({refresh_token: TOKEN_DRIVE});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

const PublicFile =  async (id) => {
  try {
    drive.permissions.create({
      fileId: id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })
  } catch (error) {
    console.log(colors.red(error))
  }
}

exports.UploadFile = async (image, share) => {

  try {
    
    const createFile = await drive.files.create({
      requestBody: {
        name: image[0].filename,
      },
      media: {
        mimeType: image[0].mimetype,
        body: fs.createReadStream(path.join(__dirname,`../images/${image[0].filename}`))
      }
    })
    if(share) {
      PublicFile(createFile.data.id)
    }
    const infoUrlImage = await drive.files.get({
      fileId: createFile.data.id,
      fields: 'webViewLink'
    })
    await DeleteFile(image[0].filename, 'image')
    return {
      url:infoUrlImage.data.webViewLink,
      imageId : createFile.data.id
     }
  } catch (error) {
    console.log(colors.red(error))
  }
}

exports.DeleteFileImage = async (idImage) => {
   try {
    const fileDelete = await drive.files.delete({
      fileId: idImage
    })
    console.log(colors.yellow(fileDelete.status))
   } catch (error) {
    console.log( "error delete image".red ,colors.red(error))
   }
}

