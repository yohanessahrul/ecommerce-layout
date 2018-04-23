'use strict'

const multer = require('multer');
const Storage = require('@google-cloud/storage');
const config = {
  CLOUD_BUCKET: 'ecommerce.yosaru.com',
  PROJECT_ID: 'expanded-goal-200806',
}

const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'My First Project-9d9e7ed12f79.json'
})

const bucket = storage.bucket(config.CLOUD_BUCKET);

module.exports = {
    sendUploadToGCS: (req, res, next) =>{
      console.log(req.file)
        if(!req.file){
            next('Failed to upload')
        }
        
        const filename = `${Date.now()}.${req.file.originalname.split('.').pop()}`;
        const file = bucket.file(filename);
        
        const stream = file.createWriteStream({
          metadata: {
            contentType: req.file.mimetype
          }
        });
      
        stream.on('error', (err) => {
          req.file.cloudStorageError = err;
          console.log(err)
          next(err);
        });
      
        stream.on('finish', () => {
          file.makePublic()
          .then(()=> {
            req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
            next()
          })
        })
      
        // let stringify = JSON.stringify(req.file.buffer)
        stream.end(req.file.buffer);
    },

    uploadMem: multer({
        storage: multer.MemoryStorage,
        limits: {
          fileSize: 10 * 1024 * 1024
        }
    })
}