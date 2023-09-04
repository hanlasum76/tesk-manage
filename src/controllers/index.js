
import service_locator from '../service_locator';
import { taskController } from './task/task_controller';
export function controllers() {
    const controllers = {};

    const { router, db } = service_locator;
    controllers.task = taskController({
        router, db
    })
    return controllers;
}