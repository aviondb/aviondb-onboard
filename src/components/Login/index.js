import React, { Fragment } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions/login";
import { useHistory } from "react-router-dom";
import { onboard } from "../../utils";

function Login(props) {
  const { user, login } = props;
  const history = useHistory();

  if (user.address) {
    history.push("/todolist");
  } else {
    startLogin(login);
  }

  return (
    <Fragment>
      <center>
        <h1>Login</h1>
      </center>
    </Fragment>
  );
}

const startLogin = async (login) => {
  await onboard.walletSelect();
  await onboard.walletCheck();
  login({ ...onboard.getState() });
};

const mapStateToProps = (state) => ({
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
