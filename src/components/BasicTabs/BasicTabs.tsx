import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useQueryState } from 'next-usequerystate';
import type { TabListProps, TabPanelProps } from '@mui/lab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

export type TabItem = {
  label: string;
  component?: ReactNode;
};

export type BasicTabsProps = TabListProps & {
  tabs: TabItem[];
  tabPanelSxProps?: TabPanelProps['sx'];
  tabSelectorsSxProps?: TabPanelProps['sx'];
  onTabChange?: (label: string) => void;
};

export function BasicTabs(props: BasicTabsProps) {
  const { tabs, tabPanelSxProps, tabSelectorsSxProps, onTabChange, ...rest } = props;
  const [tab, setTab] = useQueryState('tab');
  const [activeTab, setActiveTab] = useState(tab ?? '0');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setTab(newValue);
    if (onTabChange) {
      const selectedLabel = tabs[parseInt(newValue)].label;
      onTabChange(selectedLabel);
    }
  };

  useEffect(() => {
    if (onTabChange) {
      const selectedLabel = tabs[parseInt(activeTab)]?.label;
      onTabChange(selectedLabel);
    }
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', ...tabSelectorsSxProps }}>
          <TabList onChange={handleChange} aria-label="tabs" {...rest} variant="scrollable">
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={String(index)} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={String(index)} sx={tabPanelSxProps}>
            {tab?.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
