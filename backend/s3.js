const dotenv = require('dotenv')
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-1"
const bucketName = "ppioneerbucket"
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL(username, type, extension) {
  console.log("here")
  const rawBytes = await randomBytes(16)
  const name = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: `${username}/${type}/${name}.${extension}`,
    Expires: 60
  })

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

module.exports = generateUploadURL;