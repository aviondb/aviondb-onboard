import React, { Fragment } from "react";
import {
  addTodoItem,
  getTodoList,
  updateTodoItem,
} from "../../redux/actions/todolist";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import TodoItem from "./todoItem";

function TodoList(props) {
  const {
    addTodoItem,
    getTodoList,
    updateTodoItem,
    user,
    todoList,
    loaded,
  } = props;
  const history = useHistory();

  if (!user.address) {
    history.push("/login");
  }

  if (!loaded) {
    getTodoList();
  }
  return (
    <Fragment>
      <center>
        <div className="form-inline" style={{ marginTop: "2rem" }}>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              id="todo"
              placeholder="Enter Todo"
            />
            <br />
            <br />
            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                addTodoItem({
                  id: Math.random().toString().substr(2, 4),
                  todo: document.getElementById("todo").value,
                  isDone: false,
                });
                document.getElementById("todo").value = "";
              }}
            >
              Add Todo
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="card" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <TodoItem todos={todoList} updateTodoItem={updateTodoItem} />
          </ul>
        </div>
      </center>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  todoList: state.app.todoList,
  loaded: state.app.loaded,
});

const mapDispatchToProps = (dispatch) => ({
  addTodoItem: (payload) => dispatch(addTodoItem(payload)),
  updateTodoItem: (payload) => dispatch(updateTodoItem(payload)),
  getTodoList: () => dispatch(getTodoList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
