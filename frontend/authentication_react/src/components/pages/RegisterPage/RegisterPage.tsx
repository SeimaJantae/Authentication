import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { server } from "../../../Constants";
import { User } from "../../../types/user.type";
import { httpClient } from "../../../utils/httpclient";

type RegisterPageProps = {
  //
};

const RegisterForm = (props: FormikProps<User>) => {
  return (
    <Card sx={{ maxWidth: 450, mx: "auto", my: "2rem" }}>
      <CardContent sx={{ p: "2rem" }}>
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
                Create your account
              </Button>
            </Grid>
            <Grid xs={12} item>
              <Link href="/login" variant="body2">
                {"Have an account already? Log in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
const initialValues: User = { username: "", password: "" };

const RegisterPage: React.FC<any> = () => {
  return (
    <>
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          const result = await httpClient.post(server.REGISTER_URL, values);

          alert(JSON.stringify(result.data));

          setTimeout(() => {
            setSubmitting(false);
          }, 2000);
        }}
        initialValues={initialValues}
      >
        {(props) => RegisterForm(props)}
      </Formik>
    </>
  );
};

export default RegisterPage;
