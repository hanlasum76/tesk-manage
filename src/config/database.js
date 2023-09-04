import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './test.db',
  },
  useNullAsDefault: true,
});

// 데이터베이스 테이블 생성
async function initDB() {
  try {
    await db.schema.createTableIfNotExists('tasks', (table) => {
      table.increments('id');
      table.string('title');
      table.string('user_id');
      table.string('description');
      table.string('status');
      table.datetime('due_date');
    });
    console.log('Database table "tasks" is ready.');
  } catch (error) {
    console.error('Error creating database table:', error);
  }
}

export { db, initDB };