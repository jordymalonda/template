const AWS = require('aws-sdk');
const config = require('../config');

const s3Client = new AWS.S3({
  accessKeyId: config.get('S3_BUCKET_KEY'),
  secretAccessKey: config.get('S3_BUCKET_SECRET'),
  region: config.get('S3_BUCKET_REGION')
});

const uploadParams = {
  Bucket: config.get('S3_BUCKET'),
  Key: '', // pass key
  Body: null, // pass file body
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;
