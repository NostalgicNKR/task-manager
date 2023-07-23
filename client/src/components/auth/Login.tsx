import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HiImage from "../../assets/img/hi.gif";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const loginUser = useLogin(
    () => {
      navigate("/member");
      toast({
        title: "Success",
        description: "Redirecting to Member Area",
        status: "success",
        isClosable: true,
      });
    },
    (message: string) => {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  );

  return (
    <Box
      bgColor="white"
      mx={2}
      px={7}
      py={5}
      borderRadius="15px"
      width="100%"
      maxW="500px"
      boxShadow="0px 0px 58px -36px rgba(0,0,0,0.12);"
    >
      <HStack>
        <Text
          my={3}
          textTransform="uppercase"
          as="h2"
          fontSize="20px"
          fontWeight="600"
          color="blackAlpha.800"
        >
          welcome back
        </Text>
        <Image boxSize="60px" src={HiImage} bg="white" bgBlendMode="multiply" />
      </HStack>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (
            emailRef.current &&
            emailRef.current.value &&
            passwordRef.current &&
            passwordRef.current.value
          )
            loginUser.mutate({
              email: emailRef.current.value,
              password: passwordRef.current.value,
            });
        }}
      >
        <FormControl mt={5}>
          <FormLabel color="blackAlpha.800">Email address</FormLabel>

          <Input
            ref={emailRef}
            type="email"
            color="gray.600"
            fontWeight="medium"
          />
        </FormControl>
        <FormControl mt={5}>
          <FormLabel color="blackAlpha.800">Password</FormLabel>
          <Input
            ref={passwordRef}
            type="password"
            color="gray.600"
            fontWeight="medium"
          />
        </FormControl>
        <Button mt={5} type="submit">
          Login
        </Button>
      </form>
      <Text ml={1} color="gray.500" fontSize={14} fontWeight={"medium"} mt={5}>
        New here? <Link to="/auth/signup">Signup</Link>
      </Text>
    </Box>
  );
};

export default Login;
