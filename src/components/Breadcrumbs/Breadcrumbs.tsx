import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowForwardIosOutlined as ArrowForwardIosOutlinedIcon } from '@mui/icons-material';
import type { BreadcrumbsProps as BaseBreadcrumbsProps } from '@mui/material';
import { Breadcrumbs as BaseBreadcrumbs, Link, Typography } from '@mui/material';
import { uuidValidate, validateNumeric } from '@/utils';

export type Breadcrumb = {
  /**
   * Breadcrumb title. Example: 'blog-entries'
   */
  title: string;

  /**
   * The URL which the breadcrumb points to. Example: 'blog/blog-entries'
   */
  href: string;
};

export type BreadcrumbsProps = BaseBreadcrumbsProps & {
  /**
   * The title for the very first breadcrumb pointing to the root directory.
   * Example: '/' Default: 'HOME'
   */
  rootLabel?: string | null;

  /**
   * Boolean indicator whether the root label should be omitted.
   * Example: true Default: false
   */
  omitRootLabel?: boolean;
};

/**
 * A functional React component for Next.js that renders a dynamic Breadcrumb navigation
 * based on the current path within the Next.js router navigation.
 *
 * Only works in conjunction with Next.js, since it leverages the Next.js router.
 *
 * @param props - object of type BreadcrumbsProps
 * @returns The breadcrumb React component.
 */
export function Breadcrumbs(props: BreadcrumbsProps) {
  const { rootLabel = 'Inicio', omitRootLabel, ...rest } = props;
  const paths = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);

  useEffect(() => {
    if (paths) {
      const pathNames = paths.split('/'); // .filter((path) => path);
      pathNames.shift();

      const pathArray = pathNames.map((path, i) => {
        return {
          title: path,
          href: '/' + pathNames.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [paths]);

  if (!breadcrumbs) {
    return null;
  }

  // @ts-ignore
  return (
    <BaseBreadcrumbs
      separator={<ArrowForwardIosOutlinedIcon color="secondary" style={{ fontSize: 10, fontWeight: 400 }} />}
      aria-label="breadcrumb"
      {...rest}
    >
      {!omitRootLabel && (
        <Link underline="hover" color="secondary.main" href="/" component={NextLink}>
          {rootLabel}
        </Link>
      )}

      {breadcrumbs?.map((breadcrumb, idx) => {
        if (!breadcrumb?.title || uuidValidate(breadcrumb.title)) return;

        if (!breadcrumb?.title || validateNumeric(breadcrumb.title)) return;

        const title = breadcrumb.title;

        if (idx === breadcrumbs.length - 1) {
          return (
            <Typography key={breadcrumb.href} color="text.primary">
              {title}
            </Typography>
          );
        }

        return (
          <Link
            key={breadcrumb.href}
            underline="hover"
            color="secondary.main"
            href={breadcrumb.href}
            component={NextLink}
          >
            {title}
          </Link>
        );
      })}
    </BaseBreadcrumbs>
  );
}
