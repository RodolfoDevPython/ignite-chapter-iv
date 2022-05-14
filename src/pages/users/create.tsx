import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../servers/api";
import { queryClient } from "../../servers/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required("E-mail obrigatória ").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória").min(6, "No mínino 6 caracteres"),
    password_confirmation: yup.string().oneOf([
        null, 
        yup.ref('password'),
    ], 'As senhas precisam ser iguais')
});

export default function CreateUser() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post("users", {
            user: {
                ...user,
                created_at: new Date()
            }
        })

        return response.data.user;

    }, {
        onSuccess: () => {
            //Serve para revalidar os campos para atualizar o cache de users
            queryClient.invalidateQueries("users")
        }
    })

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        console.log(values)

        await createUser.mutateAsync(values);

        router.push("/users");

    }

    return (
        <Box>
            <Header />

            <Flex 
                w="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            > 
                <SideBar />

                <Box 
                    as="form"
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.800" 
                    p={["6","8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">
                        Criar usuário
                    </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input 
                                name="name" 
                                label="Nome completo" 
                                {...register('name')}  
                                error={errors.name}
                            />
                            <Input 
                                name="email" 
                                type="email" 
                                label="E-mail" 
                                {...register('email')}  
                                error={errors.email}
                            />
                        </SimpleGrid>   

                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input 
                                name="password" 
                                label="Senha" 
                                {...register('password')}  
                                error={errors.password}
                            />
                            <Input 
                                name="password_confirmation" 
                                type="password" 
                                label="Confirmação da senha" 
                                {...register('password_confirmation')}
                                error={errors.password_confirmation}
                            />
                        </SimpleGrid>   
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack>
                            <Link href="/users" passHref >
                                <Button colorScheme="whiteAlpha" >Cancelar</Button>
                            </Link>

                            <Button 
                                type="submit" 
                                colorScheme="pink" 
                                isLoading={isSubmitting}
                            >Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}