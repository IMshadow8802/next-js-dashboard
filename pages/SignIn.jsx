import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useSnackbar } from 'notistack';
import axios from "axios";
import useAuthStore from "@/zustand/useAuthStore";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const authStore = useAuthStore();

  const handleLogin = async () => {
    try {
      // Make a request to the login API
      const loginResponse = await axios.post(
        "http://103.30.72.63/eCRM/api/User/fetchUser_Validate",
        {
          username,
          password,
        }
      );

      // Check if the login was successful
      if (loginResponse.data) {
        // Set the user data in the Zustand store
        authStore.login(loginResponse.data);

        enqueueSnackbar("Login successful", { variant: "success" });
        router.push("/");
      } else {
        enqueueSnackbar("Login failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-white/70" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="username"
              label="Username"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleLogin}>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
