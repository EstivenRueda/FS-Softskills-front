import { Padding } from '@mui/icons-material';
import { Box, type BoxProps, Typography } from '@mui/material';

export type FormSectionTitleProps = BoxProps;

export function FormSectionTitle(props: FormSectionTitleProps) {
  return <Typography variant="h5" component="legend" my={3} {...(props as any)} />;
}

export type FormSectionProps = BoxProps & {
  /**
   * The number of columns to display using grid layout.
   */
  columns?: number;
  /**
   * The title of the form section.
   */
  title?: string;
  /**
   * The props of the title.
   */
  TitleProps?: FormSectionTitleProps;
};

export function FormSection(props: FormSectionProps) {
  const { columns, title, TitleProps, children, ...rest } = props;

  if (columns) {
    rest.display = 'grid';
    rest.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    rest.gap = rest.gap ?? 5;
  }

  rest.sx = {
    border: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingBlockStart: 0,
    paddingBlockEnd: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    marginBottom: 4,

    ...rest.sx,
  };

  return (
    <Box component="fieldset" {...rest}>
      {title && <FormSectionTitle {...TitleProps}>{title}</FormSectionTitle>}
      {children}
    </Box>
  );
}
