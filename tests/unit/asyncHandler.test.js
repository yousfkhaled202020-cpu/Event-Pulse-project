const asyncHandler = require("../../utils/asyncHandler");
describe('asyncHandler', () => {

    test('should correctly invoke wrapped function with req, res, next parameters', () => {
        const req = { id: 1 };
        const res = { status: 200 };
        const nextFunc = () => {};
    
        let receivedReq, receivedRes, receivedNext;
    
        const func = (r, s, n) => {
            receivedReq = r;
            receivedRes = s;
            receivedNext = n;
        };

        const wrapped = asyncHandler(func);
            wrapped(req, res, nextFunc);

        expect(receivedReq).toBe(req);
        expect(receivedRes).toBe(res);
        expect(receivedNext).toBe(nextFunc);
    });

    test('should catch thrown errors and rejected promises and pass to next()', (done) => {
        const error = new Error('Test error');
        const func = () => Promise.reject(error);

        const next = (err) => {
            expect(err).toBe(error);
            done();
        };

        const wrapped = asyncHandler(func);
            wrapped({}, {}, next);
    });

});