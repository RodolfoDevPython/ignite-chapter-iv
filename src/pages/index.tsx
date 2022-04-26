import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from "../components/Form/Input"; 

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatória ").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória")
})

type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async(values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values);
  } 

  console.log({
    errors
  });

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      alignItems="center" 
      justify="center" 
    >

      <Flex 
        as="form" 
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={(handleSubmit(handleSignIn))}
      >
        <Stack spacing="4" >

          <Input 
            name="email" 
            type="email" 
            label="E-mail" 
            {...register('email')} 
            error={errors.email}
          />

          <Input 
            name="password" 
            type="password" 
            label="Senha" 
            {...register('password')} 
            error={errors.password}
          />
        
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={isSubmitting}
        >Entrar</Button>
      </Flex>
      
    </Flex>
  )
}