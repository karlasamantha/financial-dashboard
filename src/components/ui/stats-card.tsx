'use client';

import { Box, Text, Flex } from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  flex?: number;
}

export default function StatsCard({
  title,
  description,
  value,
  icon,
  color,
  flex,
}: StatsCardProps) {
  return (
    <Box
      p={4}
      borderLeftWidth="3px"
      borderLeftColor={color}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      width="100%"
      flex={flex}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="sm" color="gray.500">
            {title}
          </Text>

          <Text fontSize="lg" fontWeight="bold">
            {value}
          </Text>
        </Box>
        {icon}
      </Flex>
      <Text fontSize="xs" color="gray.500">
        {description}
      </Text>
    </Box>
  );
}
