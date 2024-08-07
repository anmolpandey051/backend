// asyncHandler method
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}

// Higher Order functions => which can accept a function as a parameter.

// const asyncHandler = () => {} // simple function
// const asyncHandler = (func) => {} // a function which accept a function
// const asyncHandler = (func) => {() => {}} // a function which accepts a function as a parameter and passes further it to another function

// // Using try catch
// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status (error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

