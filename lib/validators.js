import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js"

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg).join(", ");

    console.log(errors);

    if(errors.isEmpty()) return next(); 
    else next(new ErrorHandler(errorMessages, 400));
};

const registerValidators = () => [
    body("name", "PLease enter name").notEmpty(),
    body("username", "PLease enter username").notEmpty(),
    body("password", "PLease enter password").notEmpty(),
    body("bio", "PLease enter bio").notEmpty(),
];

const loginValidators = () => [
    body("username", "PLease enter username").notEmpty(),
    body("password", "PLease enter password").notEmpty(),
];

const newGroupValidators = () => [
    body("name", "Please enter Name").notEmpty(),
    body("members", "Please enter Memebers").notEmpty().toArray({min: 2, max: 100}).withMessage("Members must be 2-100"),
];

const addMemberValidators = () => [
    body("chatId", "Please enter Chat ID").notEmpty(),
    body("members", "Please enter Memebers").notEmpty().toArray({min: 1, max: 97}).withMessage("Members must be 1-97"),
];

const removeMemberValidators = () => [
    body("chatId", "Please enter Chat ID").notEmpty(),
    body("userId", "Please enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];

const renameValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
    body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
    body("requestId", "Please Enter Request ID").notEmpty(),
    body("accept")
      .notEmpty()
      .withMessage("Please Add Accept")
      .isBoolean()
      .withMessage("Accept must be a boolean"),
  ];

  const adminLoginValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty(),
  ];



export {registerValidators, validateHandler, loginValidators, newGroupValidators,
     addMemberValidators, removeMemberValidators, sendAttachmentsValidator, chatIdValidator,
      renameValidator, sendRequestValidator, acceptRequestValidator, adminLoginValidator}