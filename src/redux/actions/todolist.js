import types from "../constants";
import { getAvionDBCollection } from "../../utils";

export const addTodoItem = (payload) => async (dispatch) => {
  const collection = await getAvionDBCollection();
  await collection.insert([payload]);
  dispatch({
    type: types.ADD_TODO,
    payload: payload,
  });
};

export const getTodoList = () => async (dispatch) => {
  const collection = await getAvionDBCollection();
  const todos = await collection.find({});
  dispatch({
    type: types.GET_TODOS,
    payload: todos,
  });
};

export const updateTodoItem = (payload) => async (dispatch) => {
  const collection = await getAvionDBCollection();
  await collection.findOneAndUpdate(
    {
      id: payload.id,
    },
    {
      $set: { isDone: payload.isDone },
    }
  );
  const todos = await collection.find({});
  dispatch({
    type: types.UPDATE_TODOS,
    payload: todos,
  });
};
