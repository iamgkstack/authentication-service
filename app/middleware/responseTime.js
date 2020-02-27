/**
 * Sets X-Response-Time field on the response
 */
module.exports = async (ctx, next) => {
    const start = new Date();
    await next();
  
    ctx.responseTime = new Date() - start;
  
    ctx.set('X-Response-Time', ctx.responseTime);
};
  