import errors from '@petfriends-common/errors';

export function authMiddleware() {
  return async (ctx, next) => {
    let authrization = '';

    const request = ctx.request;
    const method = request.method;
    if (method === 'GET') {
        authrization = ctx.request.query.authrization;
    } else if (method === 'POST') {
        authrization = ctx.request.body.authrization;
    }

    if (authrization) {
      //TODO 예외처리
    }

    await next();
  };
}
