// We are getting the file from local server which has been already being uploaded to the server.

import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // file system // Default node.js library to handle files.

    // Configuration => This configuration helps cloudinary to identify you and let you upload file 
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });

    const uploadOnCloudinary = async(localFilePath) => {
        try {
            if (!localFilePath) return null;
            // upload the file in cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type : "auto" // It is an object that is why we are using curly braces
            }) // file has been uploaded successfully
            console.log("File is uploaded in cloudinary")
            console.log(response.url) // the upload method returns something and we store that in variable response, and we can use dot(.) operator for further functionality. // read API for more information
            return response;

        // error handling
        } catch (error) {
            // we have to remove the file which is in our server if it fails to upload in cloudinary to be safe from all the mallecous files.
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed.
            return null; // returning null so that the method properly gets returned.
        }
    }


export {uploadOnCloudinary}