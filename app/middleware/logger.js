/**
 * Logs every req to the service
 */
module.exports = async (ctx, next) => {
    const start = new Date();
    await next();
  
    const used = new Date() - start;
    // eslint-disable-next-line
    console.log('%s %s %s %sms', ctx.method, ctx.originalUrl, ctx.status, used);
};
  