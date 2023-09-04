import service_locator from '../../service_locator';
import errors from '../../error';
import Joi from 'joi';

export function taskController() {
    const self = {};

    const { router, db } = service_locator;

    self.createTasks = async (ctx) => {

        const schema = Joi.object({
          title: Joi.string().required(),
          user_id: Joi.string().required(),
          description: Joi.string(),
          status: Joi.string().valid('Pending'),
          due_date: Joi.date().iso(),
        });
    
        const { error, value } = schema.validate(ctx.request.body);

        if (error) {
          throw new Error(
            errors.encode({
              status_code: 400,
              message: '입력 항목을 확인하시기 바랍니다.',
              hint: error.details[0].message,
            })
          );
        }
    
        try {
          await db('tasks').insert(value);
          ctx.body = { message: '일정 등록에 성공하였습니다.' };
        } catch (error) {
          throw new Error(errors.knex(error));
        }
    }

    router.post('/tasks', self.createTasks);


    self.getTasksDetail = async (ctx) => {
        const { user_id } = ctx.query;

        try {
          const tasks = await db('tasks').where('user_id', user_id);
          if (!tasks){
            throw new Error(
              errors.encode({
                status_code: 404,
                message: '등록된 일정이 없습니다.',
                hint: error.details[0].message,
              })
            );
          }
          ctx.body = tasks;
        } catch (error) {
          throw new Error(errors.knex(error));
        }
      }

    router.get('/tasks', self.getTasksDetail);
    
    self.updateTasks = async (ctx) => {
        const { id } = ctx.params;
        const updates = ctx.request.body;

        const schema = Joi.object({
            id: Joi.number().required(),
            title: Joi.string().required(),
            user_id: Joi.string().required(),
            description: Joi.string(),
            status: Joi.string().valid('In Progress', 'Completed'),
            quantity: Joi.number().integer().min(0),
            due_date: Joi.date().iso(),
          });

        const { error, value } = schema.validate({ ...updates, id: parseInt(id) });

        if (error) {
          throw new Error(
            errors.encode({
              status_code: 400,
              message: '입력 항목을 확인하시기 바랍니다.',
              hint: error.details[0].message,
            })
          );
        }

        try {
          await db('tasks').where('id', id).update(value);
          ctx.body = { message: '일정 업데이트가 완료되었습니다.' };
        } catch (error) {
          throw new Error(errors.knex(error));
        }
      }

    router.patch('/tasks/:id', self.updateTasks);

    self.deleteTasks = async (ctx) => {
        const { id } = ctx.params;
        try {
          const deleteQuery = {
            status: 'Deleted'
          }
          await db('tasks').where('id', id).update(deleteQuery);
          ctx.body = { message: '일정 삭제가 완료되었습니다.' };
        
        } catch (error) {
          throw new Error(errors.knex(error));
        }
      }

    router.delete('/tasks/:id', self.deleteTasks);

    return self
}