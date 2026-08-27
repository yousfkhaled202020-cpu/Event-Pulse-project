const appError = require("../../utils/AppError");

describe('AppError', () => {
    
    test('404 error should have statusCode 404 and status "fail"', () => {
        const error = new appError('Not found', 404);
        expect(error.statusCode).toBe(404);
        expect(error.status).toBe('fail');
    });

    test('500 error should have status "error"', () => {
        const error = new appError('Server error', 500);
        expect(error.status).toBe('error');
    });

    test('isOperational should default to true', () => {
        const error = new appError('Test error', 400);
        expect(error.isOperational).toBe(true);
    });

    test('should be an instance of native JavaScript Error', () => {
        const error = new appError('Test error', 404);
        expect(error instanceof Error).toBe(true);
    });

});