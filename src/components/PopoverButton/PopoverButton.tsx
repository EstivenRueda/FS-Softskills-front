import { useState } from 'react';
import { Box, Button, Card, Divider, Link, Popover, Stack, SxProps, Theme, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { maskString } from '@/utils';

export interface PopoverButtonProps {
  id?: string;
  variant?: 'text' | 'outlined' | 'contained';
  buttonText: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  href?: string;
  mask?: boolean;
  sx?: SxProps<Theme> | undefined;
  showReadMoreLink?: boolean;
  colorButton?: string;
  variantButton?: Variant;
}

export function PopoverButton({
  id,
  variant,
  buttonText,
  title,
  icon,
  content,
  href,
  mask = false,
  sx,
  showReadMoreLink = true,
  colorButton = 'primary',
  variantButton = 'body2',
}: PopoverButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button aria-describedby={id} variant={variant} onClick={handleClick} sx={{ justifyContent: 'flex-start' }}>
        <Typography
          color={colorButton}
          variant={variantButton}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {mask ? maskString(buttonText) : buttonText}
        </Typography>
      </Button>
      <Popover
        elevation={2}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Card sx={sx ? sx : { maxWidth: 700 }}>
          <Box sx={{ p: 3 }}>
            {title && (
              <>
                <Stack direction="row" gap={1} alignItems="center" pb={2}>
                  {icon}
                  {typeof title === 'string' ? (
                    <Typography
                      variant="h5"
                      color="grayText"
                      fontWeight={600}
                      sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}
                    >
                      {title}
                    </Typography>
                  ) : (
                    title
                  )}
                  {showReadMoreLink && href && (
                    <Link
                      underline="hover"
                      variant="body2"
                      sx={{ textDecoration: 'none', color: 'primary.main' }}
                      id={id}
                      href={href}
                    >
                      Ver más
                    </Link>
                  )}
                </Stack>
                <Divider sx={{ mb: 3 }} />
              </>
            )}
            <Box>{content}</Box>
          </Box>
        </Card>
      </Popover>
    </>
  );
}
