import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useUpdateUser from "../../hooks/useUpdateUser";
import authService from "../../services/AuthService";

const Profile = () => {
  usePageTitle("Profile");
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const profileBoxColorMode = useColorModeValue("white", "gray.700");

  const { currentUser } = authService();
  const toast = useToast();
  const updateUser = useUpdateUser(
    (message: string) =>
      toast({
        title: message,
        description: "You have been Logged Out",
        status: "success",
        isClosable: true,
      }),
    (message: string) =>
      toast({
        title: message,
        status: "error",
        isClosable: true,
      })
  );
  return (
    <Box
      mx="auto"
      my="50px"
      bgColor={profileBoxColorMode}
      py={10}
      px={6}
      pos="relative"
      // top="50%"
      // transform="translateY(-50%)"
      borderRadius="3%"
      maxW="500px"
    >
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
          ) {
            if (newPasswordRef.current && newPasswordRef.current.value)
              updateUser.mutate({
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value,
                newPassword: newPasswordRef.current.value,
              });
            else
              updateUser.mutate({
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value,
              });
          }
        }}
      >
        <FormControl mb={3}>
          <FormLabel>Email address</FormLabel>
          <Input
            ref={emailRef}
            type="email"
            defaultValue={currentUser.email}
            readOnly
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Name</FormLabel>
          <Input ref={nameRef} type="text" defaultValue={currentUser.name} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Current Password</FormLabel>
          <Input ref={passwordRef} type="password" />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>New Password</FormLabel>
          <Input ref={newPasswordRef} type="password" />
        </FormControl>
        <Button type="submit">Update</Button>
      </form>
    </Box>
  );
};

export default Profile;
