import React, { useState } from "react";
import "./Register.css"
import {
  FormInput,
  Grid,
  GridColumn,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";

const Register = () => {
  let InitialUser = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  let errors = [];
  const [userState, setUserState] = useState(InitialUser);
  const [errorState, setErrorState] = useState(errors);

  const handleInput = (event) => {
    let target = event.target;
    setUserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((error) => error.concat({message : "Please fill in all the fields"}));
      return false;
    } else if (!checkPassword()) {
      // setErrorState((error) => error.concat({message : "not matching"}));
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmPassword.length ||
      !userState.email.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
        setErrorState((error) => error.concat({ message: "Password length should be more than 8" }));
        return false;
    }
    else if (userState.password !== userState.confirmPassword) {
        setErrorState((error) => error.concat({ message: "Password and Confirm Password does not match" }));
        return false;
    }
    return true;
}

  const onSubmit = (event) => {
    event.preventDefault();
    setErrorState(() => []);
    if(checkForm()) {
      //
    }
    else {
      //
    }
  };

  const formatErrors = () => {
    return errorState.map((err, idx) => <p key={idx}>{err.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <GridColumn style={{ maxWidth: "500px" }}>
        <Header as="h2" icon>
          <Icon name="slack" />
          Register
        </Header>
        <form onSubmit={onSubmit}>
          <Segment stacked>
            <FormInput
              name="userName"
              value={userState.name}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
              style={{ width: "100%" }}
              size="large"
            />
            <FormInput
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Email"
              style={{ width: "100%" }}
              size="large"
            />
            <FormInput
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
              style={{ width: "100%" }}
              size="large"
            />
            <FormInput
              name="confirmPassword"
              value={userState.confirmPassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
              style={{ width: "100%" }}
              size="large"
            />
          </Segment>
          <Button onClick={onSubmit}>Submit</Button>
        </form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}
      </GridColumn>
    </Grid>
  );
}

export default Register;