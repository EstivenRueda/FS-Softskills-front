import { Psychology as PsychologyIcon } from '@mui/icons-material';
import { useConst } from './useConts';

export default function useSidebarMenuItems() {
  return useConst<Array<NavGroup | NavItem>>([
    {
      id: 'mis-habilidades-blandas',
      title: 'Mis habilidades blandas',
      icon: PsychologyIcon,
      href: '/mis-habilidades-blandas',
    },
  ]);
}
