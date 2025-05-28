import React from 'react';
import { twMerge } from 'tailwind-merge';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
  h3: 'text-xl md:text-2xl lg:text-3xl font-semibold',
  h4: 'text-lg md:text-xl lg:text-2xl font-medium',
  h5: 'text-base md:text-lg lg:text-xl font-medium',
  h6: 'text-sm md:text-base lg:text-lg font-medium',
  subtitle1: 'text-base md:text-lg font-normal',
  subtitle2: 'text-sm md:text-base font-medium',
  body1: 'text-base font-normal leading-relaxed',
  body2: 'text-sm font-normal leading-relaxed',
  button: 'text-sm font-medium tracking-wide',
  caption: 'text-xs font-normal',
  overline: 'text-xs uppercase tracking-widest font-medium'
};

const variantComponents: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span'
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  component,
  className,
  children,
  gradient,
  ...props
}) => {
  const Component = component || variantComponents[variant];
  const baseStyles = variantStyles[variant];
  
  const classes = twMerge(
    baseStyles,
    gradient ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent' : 'text-gray-900 dark:text-white',
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

// Composants préfabriqués pour les cas d'usage courants
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const Subtitle1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle1" {...props} />
);

export const Subtitle2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle2" {...props} />
);

export const Body1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body1" {...props} />
);

export const Body2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body2" {...props} />
);

export const Button = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="button" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const Overline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="overline" {...props} />
); 