import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth);
    return (
        <PageContent>
            <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text>Crea una publicación</Text>
            </Box>
            {user && <NewPostForm user={user} />}
            </>
            <>{/* About */}</>
        </PageContent>
    )
}
export default SubmitPostPage;