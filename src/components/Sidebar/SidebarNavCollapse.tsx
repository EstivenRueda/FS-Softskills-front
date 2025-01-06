import React, { MouseEvent } from 'react'
import { SidebarNavItem, type NavItem } from './SidebarNavItem';

export type SidebarNavCollapseProps = {
    menu: NavItem;
    level: number;
    pathWithoutLastPart: any;
    pathDirect: any;
    hideMenu: any;
    onClick: (event: MouseEvent<HTMLElement>) => void;
};

export function SidebarNavCollapse(props: SidebarNavCollapseProps) {
  return (
    <div>SidebarNavCollapse</div>
  )
}
