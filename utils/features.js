import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none"
};

const connectDB = (uri) => {
    mongoose.connect(uri, {dbName: 'ChatApp'}).then((data) => {
        console.log(`Connected to MongoDB: ${data.connection.host}`)
    }).catch((err) => {
        throw err
    });
};

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie('chat-token', token, cookieOptions).json({
        success: true,
        user,
        message,
    });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = [], folder) => {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          getBase64(file),
          {
            resource_type: "auto",
            public_id: uuid(),
            folder: `chat-app/${folder}`
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
  
      const formattedResults = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
      return formattedResults;
    } catch (err) {
      throw new Error("Error uploading files to cloudinary", err);
    }
  };

const deleteFilesFromCloudinary = async (public_ids) => {
  const deletePromises = public_ids.map((id) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(id, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  });

  try {
    await Promise.all(deletePromises);
  } catch (err) {
    throw new Error("Error deleting files from cloudinary", err);
  }
};


export {connectDB, sendToken, cookieOptions, emitEvent, deleteFilesFromCloudinary, uploadFilesToCloudinary};