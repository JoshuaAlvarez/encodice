import { Flex } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import Login from './Login';
import SignUp from './SignUp';

const styles = {
    container: {
        //direction: 'column',
        align: 'center',
        width: '100%',
        marginTop: 4,
    },
};

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
    const { view } = useRecoilValue(authModalState);

    return (
        <Flex style={styles.container}>
            {view === 'login' && <Login />}
            {view === 'signup' && <SignUp />}
        </Flex>
    );
};

AuthInputs.propTypes = {
    view: PropTypes.oneOf(['login', 'signup']).isRequired,
};

export default AuthInputs;
