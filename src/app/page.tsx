'use client';

import { Box, Flex, Container, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSessionStatus } from '@/hooks/useSessionStatus';

export default function Home() {
  const router = useRouter();
  const { loggedIn, loading } = useSessionStatus();

  const handleButtonClick = () => {
    if (loggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <Flex minH="100vh" direction="column">
      <Box as="header" bg="white" color="indigo" py={4}>
        <Container
          maxW="container.xl"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="2xl" fontWeight="bold">
            FinDash
          </Text>
          <Button
            bg="indigo"
            color="white"
            fontWeight="600"
            _hover={{ bg: 'indigo.500' }}
            onClick={handleButtonClick}
            loading={loading}
          >
            {loading ? '' : loggedIn ? 'Dashboard' : 'Login'}
          </Button>
        </Container>
      </Box>

      <Flex
        as="main"
        flex="1 1 auto"
        align="center"
        justify="center"
        py={8}
        width="100%"
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            gap={{ base: 8, md: 4 }}
            minH="320px"
            width="100%"
          >
            <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
              <Text as="h1" fontSize="4xl" fontWeight="bold" mb={4}>
                Gerencie suas finanças com confiança
              </Text>
              <Text fontSize="lg" color="gray.600">
                Gerencie suas finanças com confiança com nossa plataforma fácil
                de usar.
              </Text>
            </Box>
            <Box
              flex="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src="https://placehold.co/320x220/png"
                alt="Dashboard"
                width={320}
                height={220}
                style={{ borderRadius: '12px', objectFit: 'cover' }}
                priority
              />
            </Box>
          </Flex>
        </Container>
      </Flex>

      <Box
        as="footer"
        bg="indigo"
        color="white"
        height={{ base: '180px', sm: '300px' }}
        minH={{ base: '120px', sm: '200px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Text fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} FinDash. Todos os direitos
          reservados.
        </Text>
      </Box>
    </Flex>
  );
}
