import {
  Psychology as PsychologyIcon,
  ContentPasteSearch as ContentPasteSearchIcon,
  Filter as FilterIcon
} from '@mui/icons-material';
import { NavGroup, NavItem } from '@/components';
import { useConst } from './useConts';

export default function useSidebarMenuItems() {
  return useConst<Array<NavGroup | NavItem>>([
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
    },
    {
      id: 'resultados',
      title: 'Resultados',
      icon: ContentPasteSearchIcon,
      href: '/resultados',
    }
  ]);
}
