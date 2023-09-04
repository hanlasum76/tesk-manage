export function errorMiddleware() {
    return async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        console.log({ e });
        let error;
        try {
          error = JSON.parse(e.message);
   
        } catch (parse_error) {
          // bypass source error
          error = {
            status_code: e.status_code || 500,
            message: 'Unhandled exception: Server error',
            hint: e.stack || '',
          };
        }
  
        ctx.body =  {
            message: error.message,
            status_code: Number(error.status_code) || 500,
            hint: error.hint,
        };
        ctx.status = Number(error.status_code);
      }
    };
  }