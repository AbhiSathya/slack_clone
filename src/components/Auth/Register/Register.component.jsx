import { useState, useEffect } from "react";
import "../Auth.css";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import { AccountCircle, MailOutline, Lock } from "@mui/icons-material";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import { auth, realTimeDb } from "../../../server/firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const InitialUser = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userState, setUserState] = useState(InitialUser);
  const [errorState, setErrorState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    const target = event.target;
    setUserState((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const checkForm = () => {
    setErrorState([]); // Clear any previous errors
    if (isFormEmpty()) {
      setErrorState([{ message: "Please fill in all the fields" }]);
      return false;
    } else if (!checkPassword()) {
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
      setErrorState([{ message: "Password length should be more than 8" }]);
      return false;
    } else if (userState.password !== userState.confirmPassword) {
      setErrorState([{ message: "Password and Confirm Password do not match" }]);
      return false;
    }
    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorState([]);
    setIsSuccess(false);

    if (checkForm()) {
      setIsLoading(true);
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          userState.email,
          userState.password
        );
        console.log(`User ${user.uid} created`);

        // Update the profile with displayName and photoURL
        await updateProfile(user, {
          displayName: userState.userName,
          photoURL: `http://gravatar.com/avatar/${user.uid}?d=identicon`,
        });

        // Save user data to database
        await saveUserInDb(user);

        // Listen for auth changes to ensure displayName and photoURL are updated
        onAuthStateChanged(auth, (updatedUser) => {
          if (updatedUser) {
            console.log("Updated user data", updatedUser.displayName, updatedUser.photoURL);
            setIsSuccess(true);
            setTimeout(() => {
              navigate("/"); // Navigate only after Firebase confirms update
            }, 2000);
          }
        });

        setIsLoading(false);
      } catch (serverError) {
        setIsLoading(false);
        setErrorState([{ message: serverError.message }]);
      }
    }
  };

  const saveUserInDb = async (user) => {
    const userRef = ref(realTimeDb, `users/${user.uid}`);
    const userData = {
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    try {
      await set(userRef, userData);
    } catch (error) {
      setErrorState([{ message: "Error saving user data: " + error.message }]);
    }
  };

  const formatErrors = () => {
    return errorState.map((err, idx) => <p key={idx}>{err.message}</p>);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="grid-form"
    >
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            <IconButton>
              <HowToRegSharpIcon fontSize="large" />
            </IconButton>
            Register
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              name="userName"
              value={userState.userName}
              onChange={handleInput}
              label="User Name"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <AccountCircle />
                  </IconButton>
                ),
              }}
              autoComplete="username"
            />
            <TextField
              name="email"
              value={userState.email}
              onChange={handleInput}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <MailOutline />
                  </IconButton>
                ),
              }}
              autoComplete="email"
            />
            <TextField
              name="password"
              value={userState.password}
              onChange={handleInput}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <Lock />
                  </IconButton>
                ),
              }}
              autoComplete="new-password"
            />
            <TextField
              name="confirmPassword"
              value={userState.confirmPassword}
              onChange={handleInput}
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <IconButton position="start">
                    <Lock />
                  </IconButton>
                ),
              }}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
          {errorState.length > 0 && (
            <Alert severity="error" style={{ marginTop: "20px" }}>
              <Typography variant="h6">Errors</Typography>
              {formatErrors()}
            </Alert>
          )}
          {isSuccess && (
            <Alert
              severity="success"
              style={{
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Successfully Registered!</Typography>
            </Alert>
          )}
          <Typography style={{ marginTop: "20px", textAlign: "center" }}>
            Already a User? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
