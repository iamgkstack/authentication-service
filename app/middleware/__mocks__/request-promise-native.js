module.exports = function request(
    options = {
      headers: {},
      query: {}
    }
  ) {
    return new Promise((resolve, reject) => {
      const token = options.headers.Authorization.split(' ')[1];
  
      if (token === 'validToken') {
        return resolve({
          isAdmin: false
        });
      }
  
      if (token === 'validAdminToken') {
        return resolve({
          isAdmin: true
        });
      }
  
      return reject({
        statusCode: 401,
        error: { message: 'UNAUTHENTICATED' }
      });
    });
  };
  