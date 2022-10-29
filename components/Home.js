import React from 'react';
import {
    Container,
    Box,
    Flex,
    Heading,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { NavLink } from './navbar';


const Links = [{text:'home',link:'/'}];


const ArticleList = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                    </HStack>
                    <NavLink link={"/login"} >Login</NavLink>
                </Flex>
            </Box>
            <Container maxW={'7xl'} p="12">
                <Heading as="h1">Login to See Recipes</Heading>
            </Container>
        </>
    );
};

export default ArticleList;
