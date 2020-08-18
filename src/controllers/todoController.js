import * as todoQueries from '@/services/queries/todoQueries';
import HttpStatus from 'http-status-codes';

/**
 * View todos
 */
export const index = async (req, res, next) => {
  const { userId } = req.headers;
  const todos = await todoQueries.getAllTodos(userId);
  res.status(200).json({
    error: false,
    status: HttpStatus.OK,
    message: 'All todos',
    data: {
      todos
    }
  });
};

/**
 * Create todo
 */

export const create = async (req, res, next) => {
  const { userId } = req.headers;

  try {
    const createdTodo = await todoQueries.createTodo(userId, req.body);

    res.status(HttpStatus.CREATED).json({
      error: false,
      status: HttpStatus.CREATED,
      data: createdTodo,
      message: 'New todo added'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Show single todo
 */

export const show = async (req, res, next) => {
  const todoId = req.params.id;
  const { userId } = req.headers;
  try {
    const todos = await todoQueries.showTodo(userId, todoId);

    if (!todos.length) {
      return next({
        error: true,
        message: 'No such todo found',
        data: null,
        status: HttpStatus.BAD_REQUEST
      });
    }

    res.status(200).json({
      error: false,
      status: HttpStatus.OK,
      message: 'Single todos',
      data: {
        todos
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Edit todo
 */

export const update = async (req, res, next) => {
  const todoId = req.params.id;
  const { userId } = req.headers;

  try {
    const updatedTodo = await todoQueries.editTodo(userId, todoId, req.body);

    if (updatedTodo.rowCount <= 0) {
      return next({
        message: 'No Such todo found. Not updated'
      });
    }

    res.status(HttpStatus.CREATED).json({
      error: false,
      status: HttpStatus.CREATED,
      data: req.body,
      message: 'Updated Todo'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Hard delete todo
 */

export const remove = async (req, res, next) => {
  const todoId = req.params.id;
  const { userId } = req.headers;

  try {
    const deletedTodo = await todoQueries.deleteTodo(userId, todoId);

    if (deletedTodo.rowCount <= 0) {
      return next({
        message: 'No Such todo found. Not deleted'
      });
    }

    res.status(HttpStatus.OK).json({
      error: false,
      status: HttpStatus.OK,
      data: { todoId: todoId },
      message: 'Deleted Todo'
    });
  } catch (error) {
    next(error);
  }
};
