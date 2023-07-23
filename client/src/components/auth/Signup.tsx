import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  LightMode,
  Text,
  useToast,
} from "@chakra-ui/react";
import HiImage from "../../assets/img/hi.gif";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const registerUser = useSignup(
    () => {
      navigate("/auth/login");
      toast({
        title: "Account Created",
        description: "Redirecting you to Login Page",
        status: "success",
        isClosable: true,
      });
    },
    (message: string) =>
      toast({
        title: message,
        status: "error",
        isClosable: true,
      })
  );
  return (
    <LightMode>
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
            Hey, Hello
          </Text>
          <Image
            boxSize="60px"
            src={HiImage}
            bg="white"
            bgBlendMode="multiply"
          />
        </HStack>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (
              nameRef.current &&
              nameRef.current.value &&
              emailRef.current &&
              emailRef.current.value &&
              passwordRef.current &&
              passwordRef.current.value
            )
              registerUser.mutate({
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value,
              });
          }}
        >
          <FormControl mt={5}>
            <FormLabel color="blackAlpha.800">Name</FormLabel>
            <Input
              ref={nameRef}
              type="text"
              color="gray.600"
              fontWeight="medium"
            />
          </FormControl>
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
          <Button type="submit" mt={5}>
            Register
          </Button>
        </form>
        <Text
          ml={1}
          color={"gray.500"}
          fontSize={14}
          fontWeight={"medium"}
          mt={5}
        >
          Already a Member? <Link to="/auth/login">Login</Link>
        </Text>
      </Box>
    </LightMode>
  );
};

export default Signup;
