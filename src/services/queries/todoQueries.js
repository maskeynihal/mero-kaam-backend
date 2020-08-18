import client from '@/config/database';

export const getAllTodos = async (userId) => {
  try {
    const queryTodo = await client.query('SELECT * FROM todos WHERE user_id = ($1)', [userId]);
    return queryTodo.rows;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (userId, data) => {
  const { title, description, status, dueDate } = data;
  try {
    const createdTodos = await client.query(
      'INSERT INTO todos(user_id, title, description, status, due_date) VALUES ($1,$2,$3,$4,$5)',
      [userId, title, description, status, dueDate]
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const showTodo = async (userId, todoId) => {
  try {
    const createdTodos = await client.query('SELECT * FROM todos WHERE user_id=($1) AND id=($2)', [userId, todoId]);

    return createdTodos.rows;
  } catch (error) {
    throw error;
  }
};

export const editTodo = async (userId, todoId, data) => {
  const { title, description, status, dueDate } = data;
  try {
    const updatedTodo = await client.query(
      'UPDATE todos SET title=($1), description=($2), status=($3), due_date=($4) WHERE user_id=($5) AND id=($6)',
      [title, description, status, dueDate, userId, todoId]
    );

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (userId, todoId) => {
  try {
    const deletedTodo = await client.query('DELETE FROM todos WHERE user_id=($1) AND id=($2)', [userId, todoId]);
    return deletedTodo;
  } catch (error) {
    throw error;
  }
};
