import { useState } from "react";
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
import { MailOutline, Lock } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import { auth } from "../../../server/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const initialUser = {
    email: "",
    password: "",
  };

  let errors = [];
  const navigate = useNavigate(); // Move useNavigate outside onSubmit

  const [userState, setUserState] = useState(initialUser);
  const [errorState, setErrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    const target = event.target;
    setUserState((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState([{ message: "Please fill in all the fields" }]);
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.email.length ||
      !userState.password.length
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorState([]); // Clear previous errors
    if (checkForm()) {
      setIsLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          userState.email,
          userState.password
        );
        console.log(user);
        setIsLoading(false);
        navigate('/'); // Redirect after successful login
      } catch (serverError) {
        setIsLoading(false);
        setErrorState([{ message: serverError.message }]);
      }
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
              <LoginIcon fontSize="large" />
            </IconButton>
            Login
          </Typography>
          <form onSubmit={onSubmit}>
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
          {errorState.length > 0 && (
            <Alert severity="error" style={{ marginTop: "20px" }}>
              <Typography variant="h6">Errors</Typography>
              {formatErrors()}
            </Alert>
          )}

          <Typography style={{ marginTop: "20px", textAlign: "center" }}>
            Not an User? <Link to="/register">Register</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
