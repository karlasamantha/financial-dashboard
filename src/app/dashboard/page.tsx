'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/ui/sidebar';
import { IconButton } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function DashboardPage() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div>
      {isMobile && !isSidebarOpen && (
        <IconButton
          aria-label="Abrir menu"
          size="lg"
          variant="ghost"
          style={{ position: 'fixed', top: 24, left: 24, zIndex: 1000 }}
          onClick={() => setIsSidebarOpen(true)}
        >
          <ArrowRight />
        </IconButton>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
