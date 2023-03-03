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
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as React from "react";

type RegisterPageProps = {
  //
};

const RegisterForm = (props: FormikProps<any>) => {
  return (
    <Card sx={{ maxWidth: 450, mx: "auto", my: "2rem" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" color="GrayText" gutterBottom>
          Please enter your details.
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
                SIGN UP
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
const RegisterPage: React.FC<any> = () => {
  return (
    <>
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            setSubmitting(false);
          }, 2000);
        }}
        initialValues={{ username: "", password: "" }}
      >
        {(props) => RegisterForm(props)}
      </Formik>
    </>
  );
};

export default RegisterPage;
