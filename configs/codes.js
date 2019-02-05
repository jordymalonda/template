module.exports = {
  httpStatus: {
    ok: 200,
    badRequest: 400,
    notFound: 404,
    unauthorized: 401,
    forbidden: 403,
    internalServerError: 500
  },
  errorMessage: {
    emailExist: 'This User is exist',
    badRequest: 'Bad Request',
    notFound: 'User not found'
  },
  trxStatus: {
    pending: 0,
    success: 1,
    failed: 9
  }
};
