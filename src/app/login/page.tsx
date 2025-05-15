'use client';
import {
  Flex,
  Center,
  Heading,
  Text,
  Box,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';

import { LoginForm } from './login-form';

const Title = styled(Heading)`
  font-size: 2rem;
  font-weight: bold;
`;

export default function Login() {
  return (
    <Flex h="100vh" w="100vw">
      <Center flex={1} flexDirection="column">
        <Box mb={4} textAlign="center">
          <Title as="h1">FinanceDash</Title>
          <Text fontSize="md">Sign in to your account</Text>
        </Box>

        <LoginForm />

        <Box mt={4}>
          <ChakraLink as={Link} href="/" color="indigo">
            Back to Home
          </ChakraLink>
        </Box>
      </Center>
    </Flex>
  );
}
