import { forwardRef, ForwardRefRenderFunction } from "react"
import { FormControl, Input as ChakraInput, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";
import { FieldErrors } from "react-hook-form";

interface InputPropos extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldErrors;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputPropos> = ({ name, label, error = null, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error} >

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

            {
                !!error && (
                    <FormErrorMessage>
                        { error.message }
                    </FormErrorMessage>
                )
            }

        </FormControl>

    )
}
 
export const Input = forwardRef(InputBase); 