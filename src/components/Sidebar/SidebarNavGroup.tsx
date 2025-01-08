import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { ListSubheader, Theme, styled } from '@mui/material';

export type NavGroup = {
  label?: boolean;
  subheader: string;
};

export type SidebarNavGroupProps = {
  item: NavGroup;
  hideMenu: string | boolean;
};

export function SidebarNavGroup(props: SidebarNavGroupProps) {
  const { item, hideMenu } = props;

  const ListSubheaderStyle = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginBottom: theme.spacing(0),
      color: 'text.primary',
      lineHeight: '26px',
      height: '32px',
      padding: hideMenu ? '3px 8px' : '3px 12px',
    })
  );

  return <ListSubheaderStyle>{hideMenu ? <MoreHorizIcon /> : item.subheader}</ListSubheaderStyle>;
}
