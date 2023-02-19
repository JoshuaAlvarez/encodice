import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

const SignUp: React.FC = () => {
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    // noinspection JSUnusedLocalSymbols : user const IS needed in 'FIREBASE_ERRORS[userError?.message...'
    const [createUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError('');
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
            .catch(error => {
                setError(FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                required
                name="email"
                placeholder="Correo electrónico"
                type="email"
                mb={2}
                onChange={handleChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            <Input
                required
                name='password'
                onChange={handleChange}
                placeholder='Contraseña'
                type={'password'}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg="gray.50"
            />
            <Input
                required
                name='confirmPassword'
                onChange={handleChange}
                placeholder='Repetir contraseña'
                type={'password'}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            <Text textAlign="center" mt={2} color="red" fontSize="10pt">
                {error ||
                    FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button width={"100%"} height='36px' mt={2} mb={2} type='submit' isLoading={loading}>
                Regístrate
            </Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>¿Ya tienes una cuenta? </Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "login",
                        }))
                    }
                >
                    Inicia Sesión
                </Text>
            </Flex>
        </form>
    );
}
export default SignUp;
