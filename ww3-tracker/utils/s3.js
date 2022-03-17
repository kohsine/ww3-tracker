import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env._AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env._AWS_SECRET_ACCESS_KEY,
    region: process.env._AWS_REGION
})

export default async function uploadFile(file) {

    const s3 = new AWS.S3();

    const params = {
        Bucket: process.env._AWS_BUCKET,
        Key: file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: file.type
    };

    // returns url
    return s3.upload(params).promise()
        .then(data => {
            return data.Location
        })

}