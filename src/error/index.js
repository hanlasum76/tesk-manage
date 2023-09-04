export default {
    knex: (error) => {
      let msg = 'Server Error';
  
      if (error) {
        console.error(error.toString());
        if (error.sql) {
          console.error(`Query Error:\n${error.sql}`);
        }
      }
   
      const form = {
        status_code: 500,
        message: msg,
        hint: {
          code: error.code,
          errno: error.errno,
          sql_message: error.sqlMessage,
          sql_state: error.sqlState,
          sql: error.sql,
        },
      };
  
      return JSON.stringify(form);
    },
    encode: ({ message, status_code, hint, retry = false }) => {
      if (status_code === 500) {
        console.error({ hint });
      }
  
      const form = {};
      if (message && message.length) {
        form.message = message;
      }
  
      if (status_code) {
        form.status_code = status_code;
      }
  
      if (hint) {
        form.hint = hint;
      }
  
      form.retry = Boolean(retry);
  
      return JSON.stringify(form);
    }
  }