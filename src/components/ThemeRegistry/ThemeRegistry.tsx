import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { enUS as coreEnUS, esES as coreEsES } from '@mui/material/locale';
import { enUS as dataGridEnUS, esES as dataGridEsES } from '@mui/x-data-grid/locales';
import { enUS as datePickersEnUS, esES as datePickersEsES } from '@mui/x-date-pickers/locales';
import { enUS as dateEnUS, es as dateEsES } from 'date-fns/locale';
import { DateFnsProvider } from '../forms';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import { mainTheme } from './mainTheme';

const locales = {
  es: [coreEsES, dataGridEsES, datePickersEsES],
  en: [coreEnUS, dataGridEnUS, datePickersEnUS],
};

const dateLocales = {
  es: dateEsES,
  en: dateEnUS,
};

export type ThemeRegistryProps = PropsWithChildren;

export function ThemeRegistry(props: ThemeRegistryProps) {
  const { children } = props;
  const locale = 'es';

  const themeWithLocale = useMemo(() => createTheme(mainTheme, ...locales[locale]), []);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={themeWithLocale}>
        <CssBaseline />
        <DateFnsProvider adapterLocale={dateLocales[locale]}>{children}</DateFnsProvider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
