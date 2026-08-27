const { body, param } = require("express-validator");
//regiter or signup  rules
const registerRules = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),
    body("email")
        .trim()
        .isEmail().withMessage("Must be a valid email format")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

const loginRules = [
    body("email")
        .trim()
        .isEmail().withMessage("Must be a valid email format")
        .normalizeEmail(),
    body("password")
        .notEmpty().withMessage("Password is required")
];

const createEventRules = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
    
    body("category")
        .isMongoId().withMessage("Category must be a valid MongoId"),
    
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required"),
    
    body("capacity")
        .isInt({ min: 1 }).withMessage("Capacity must be a positive number of at least 1"),
    
    body("date")
        .isISO8601().withMessage("Date must be a valid ISO8601 date format"),
    
    body("venue")
        .trim()
        .notEmpty().withMessage("Venue is required"),
        
    body("address.city")
        .trim()
        .notEmpty().withMessage("City is required")
        .isLength({ min: 3 }).withMessage("City must be at least 3 characters"),
        
    body("address.street")
        .trim()
        .notEmpty().withMessage("Street is required")
        .isLength({ min: 3 }).withMessage("Street must be at least 3 characters"),
        
    body("address.details")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Address details cannot exceed 500 characters")
];

const updateEventRules = [
    param("id")
        .isMongoId().withMessage("ID parameter must be a valid MongoId"),
    
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
    
    body("category")
        .optional()
        .isMongoId().withMessage("Category must be a valid MongoId"),
    
    body("description")
        .optional()
        .trim()
        .notEmpty().withMessage("Description cannot be empty if provided"),
    
    body("capacity")
        .optional()
        .isInt({ min: 1 }).withMessage("Capacity must be a positive number of at least 1"),
    
    body("date")
        .optional()
        .isISO8601().withMessage("Date must be a valid date format"),
        
    body("venue")
        .optional()
        .trim()
        .notEmpty().withMessage("Venue cannot be empty if provided"),

    body("address.city")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("City must be at least 3 characters"),
        
    body("address.street")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("Street must be at least 3 characters"),
        
    body("address.details")
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage("Address details cannot exceed 500 characters")
];
//register event rules
const registrationRules = [
    param("id")
        .isMongoId().withMessage("eventId must be a valid MongoId")
];

module.exports = {
    registerRules,
    loginRules,
    createEventRules,
    updateEventRules,
    registrationRules
};