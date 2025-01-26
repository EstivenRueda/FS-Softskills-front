import { useMemo } from 'react';
import {
  Psychology as PsychologyIcon,
  ContentPasteSearch as ContentPasteSearchIcon,
  Filter as FilterIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { NavGroup, NavItem } from '@/components';
import { useAuth } from './auth';

export default function useSidebarMenuItems() {
  const { isLoading, user } = useAuth();

  return useMemo<Array<NavGroup | NavItem>>(() => {
    user;
    const menu = [];

    if (user && user.profile.type === 'ADMINISTRATIVE') {
      menu.push(
        {
          id: 'habilidades-blandas',
          title: 'Habilidades blandas',
          icon: AssignmentIcon,
          href: '/habilidades-blandas',
        },
        {
          id: 'resultados',
          title: 'Resultados',
          icon: ContentPasteSearchIcon,
          href: '/resultados',
        }
      );
    }

    menu.push(
      {
        id: 'mis-habilidades-blandas',
        title: 'Mis habilidades blandas',
        icon: PsychologyIcon,
        href: '/mis-habilidades-blandas',
      },
      {
        id: 'capacitaciones',
        title: 'Capacitaciones',
        icon: FilterIcon,
        href: '/capacitaciones',
      }
    );

    return menu;
  }, [isLoading, user]);
}
