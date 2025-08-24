import { css } from '@emotion/native';

export const colors = {
  primary: '#3B82F6',
  primaryDark: '#1D4ED8',
  secondary: '#10B981',
  background: '#F8FAFC',
  backgroundDark: '#0F172A',
  surface: '#FFFFFF',
  surfaceDark: '#1E293B',
  text: '#1F2937',
  textDark: '#F9FAFB',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  borderDark: '#374151',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  superAdmin: '#8B5CF6',
  admin: '#3B82F6',
  contractor: '#F59E0B',
  gradient: {
    primary: ['#3B82F6', '#8B5CF6'],
    secondary: ['#10B981', '#059669'],
    danger: ['#EF4444', '#DC2626'],
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const typography = {
  h1: css`
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
  `,
  h2: css`
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  `,
  h3: css`
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
  `,
  body: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,
  caption: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  small: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  `,
};

export const layout = {
  container: css`
    flex: 1;
    padding: ${spacing.md}px;
  `,
  centerContent: css`
    justify-content: center;
    align-items: center;
  `,
  spaceBetween: css`
    justify-content: space-between;
    align-items: center;
  `,
  row: css`
    flex-direction: row;
  `,
  column: css`
    flex-direction: column;
  `,
};
