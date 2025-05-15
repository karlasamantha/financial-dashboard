'use client';

import { Button, Box, Text, Icon } from '@chakra-ui/react';
import styled from 'styled-components';
import { ArrowLeft, LogOut, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SidebarContainer = styled.aside`
  width: 250px;
  border-right: 1px solid var(--chakra-colors-gray-200);
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--chakra-colors-gray-200);
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

const SidebarFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.5rem;
  border-top: 1px solid var(--chakra-colors-gray-200);
`;

export default function Sidebar({
  isOpen = true,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await fetch('/api/session', { method: 'POST' });
    router.push('/login');
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Text fontSize="2xl" fontWeight="bold" as="h2" color="indigo">
          FinDash
        </Text>

        <Button onClick={onClose} size="sm" variant="ghost">
          <Icon as={ArrowLeft} />
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          gap={2}
          width="100%"
        >
          <Button
            onClick={() => router.push('/')}
            size="sm"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
          >
            <Icon as={Home} style={{ marginRight: 8 }} />
            <Text fontSize="sm" fontWeight="bold" color="indigo">
              Home
            </Text>
          </Button>
        </Box>
      </SidebarContent>

      <SidebarFooter>
        <Text fontSize="sm" fontWeight="bold" color="indigo">
          Logout
        </Text>

        <Button onClick={handleLogout} size="sm" variant="ghost">
          <Icon as={LogOut} />
        </Button>
      </SidebarFooter>
    </SidebarContainer>
  );
}
