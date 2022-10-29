import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Add from './action';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
const Links = ['browse'];

const NavLink = ({ children, ...props }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={props?.link}>
    {children}
  </Link>
);

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabaseClient = useSupabaseClient()
  const router = useRouter();
  const [recipe, setRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    fetchRecipe();
  }, [router.isReady])
  const fetchRecipe = async () => {
    let de = "";
    if (searchQuery) {
      de = searchQuery.split(" ").join(" & ");
    }
    // console.log("searchQuery",de)
    if (de === "") {
      const { data, error } = await supabaseClient.from('recipe').select('*');

      if (error) {
        console.error(error, "err")
        return [];
      }
      else console.log(data, "txt")
      setRecipe(data);
      return;

    }
    const { data, error } = await supabaseClient
      .rpc('server', {
        query: de
      });

    if (error) {
      console.error(error, "err")
      return [];
    }
    else console.log(data, "txt")
    setRecipe(data);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (searchQuery.length > 3) {
      console.log(searchQuery, "searchQuery")
      fetchRecipe();
    }
  };


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
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={() => {
                window.location.href = '/add';
              }}
              leftIcon={<AddIcon />}>
              Add
            </Button>
            <Menu>

              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://i.stack.imgur.com/l60Hf.png'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => supabaseClient.auth.signOut()} color="red">
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Flex direction='column' alignContent='center' justifyContent='center'>
        <Input maxW="500" name='search' value={searchQuery} onChange={handleChange}
          onSubmit={() => {
            console.log("searching for: " + searchQuery);
          }}
          placeholder="Search"
        ></Input>
        <List data={recipe} />
      </Flex>
    </>
  );
}

function List(props) {
  const data = props?.data;
  console.log(data, "data")
  return (
    <ul>
      {data?.length > 0 && data.map((item) => (
        <Stack as={'nav'} spacing={4}>
          <NavLink link={"/recipe/" + item.id} key={item.id}>{item.title}</NavLink>
        </Stack>
      ))}
    </ul>
  )
}
