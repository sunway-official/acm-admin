import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { Buffer } from 'buffer';
import uuid from 'uuid/v1';

const S3_ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.REACT_APP_S3_SECRET_KEY;
const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;
const S3_BUCKET_REGION = process.env.REACT_APP_S3_BUCKET_REGION;

const S3 = new AWS.S3({
  region: S3_BUCKET_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});

export const putAsync = ({ name, bodyFile, isImage = true, ...options }) => {
  return new Promise((resolve, reject) => {
    let uriParts = name.split('.');
    let fileType = uriParts[uriParts.length - 1];
    // console.log('bodyFile', bodyFile);

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: uuid() + '.' + fileType, // Generate random UUID
      Body: isImage ? new Buffer(bodyFile, 'base64') : bodyFile, // Tranform file to base64
      // Body: bodyFile,
      ACL: 'public-read', // By default: putObject will set file to public
      ...options,
    };

    S3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({
        Key: params.Key,
        response: data,
      });
    });
  });
};

export default { putAsync };
