import { forwardRef, ForwardRefRenderFunction } from "react"
import { FormControl, Input as ChakraInput, FormLabel, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputPropos extends ChakraInputProps {
    name: string;
    label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputPropos> = ({ name, label, ...rest }, ref) => {
    return (
        <FormControl>

            { label && <FormLabel htmlFor="password">{label}</FormLabel> }
            
            <ChakraInput 
                id={name}
                name={name}
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{ bgColor: 'gray.900' }}
                size="lg"
                ref={ref}
                {...rest}
            />
        </FormControl>

    )
}
 
export const Input = forwardRef(InputBase); 