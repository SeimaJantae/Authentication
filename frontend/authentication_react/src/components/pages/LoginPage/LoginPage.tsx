import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { User } from "../../../types/user.type";

const LoginForm = (props: FormikProps<User>) => {
  return (
    <Card sx={{ maxWidth: 450, mx: "auto", my: "2rem" }}>
      <CardContent sx={{ p: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="GrayText" gutterBottom>
          Log in to continue
        </Typography>
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} sx={{ my: "1rem" }}>
            <Grid xs={12} item>
              <TextField
                id="username"
                label="Username"
                placeholder="Enter your username"
                variant="outlined"
                fullWidth
                required
                autoComplete="email"
                autoFocus
                onChange={props.handleChange}
                value={props.values.username}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                variant="outlined"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.password}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={props.isSubmitting}
              >
                Log in
              </Button>
            </Grid>
            <Grid xs={12} item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

const initialValues = { username: "", password: "" };
const LoginPage: React.FC<any> = () => {
  return (
    <>
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            setSubmitting(false);
          }, 2000);
        }}
        initialValues={initialValues}
      >
        {(props) => LoginForm(props)}
      </Formik>
    </>
  );
};

export default LoginPage;
