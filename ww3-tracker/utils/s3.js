import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

export default async function uploadFile(file) {

    const s3 = new AWS.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: Date.now() + '-' + file.originalname,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype
    };

    // returns url
    return s3.upload(params).promise()
        .then(data => {
            return data.Location
        })

}