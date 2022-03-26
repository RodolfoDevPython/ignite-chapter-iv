import { FormControl, Input as ChakraInput, FormLabel, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputPropos extends ChakraInputProps {
    name: string;
    label?: string;
}

export function Input({ name, label, ...rest }: InputPropos) {
    return (
        <FormControl>

            { label && <FormLabel htmlFor="password">Senha</FormLabel> }
            
            <ChakraInput 
                id={name}
                name={name}
                type="password" 
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{ bgColor: 'gray.900' }}
                size="lg"
                {...rest}
            />
        </FormControl>

    )
}