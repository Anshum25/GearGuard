import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import { response } from 'express';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            console.error('Cloudinary upload: No local file path provided');
            return null;
        }
        // upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type:'auto'
        })
        // file has been uploaded successfully
        console.log("File is uploaded on cloudinary:", res.url);
        
        // Remove the locally saved temp file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return res
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        // Remove the locally saved temp file as the upload operation failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export {uploadOnCloudinary}