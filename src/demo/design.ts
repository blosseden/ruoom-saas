export const colors = {
  primary: '#0F2167',
  primaryLight: '#1A3A9C',
  primaryDark: '#081340',
  accent: '#00C9A7',
  accentHover: '#00A88A',
  bg: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceHover: '#F8FAFC',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  textPrimary: '#0D1421',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  naver: '#03C75A',
  kakao: '#FEE500',
  google: '#FFFFFF',
  sidebarBg: '#0F2167',
  sidebarText: 'rgba(255,255,255,0.7)',
  sidebarActive: 'rgba(255,255,255,0.12)',
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 12px rgba(0,0,0,0.08)',
  lg: '0 8px 30px rgba(0,0,0,0.10)',
  xl: '0 20px 60px rgba(0,0,0,0.14)',
  glow: '0 0 0 3px rgba(0,201,167,0.2)',
} as const;

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  full: '9999px',
} as const;

export const globalCSS = `
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #F5F7FA;
    color: #0D1421;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }

  button { cursor: pointer; font-family: inherit; }
  input, textarea, select { font-family: inherit; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30%           { transform: translateY(-6px); }
  }
  .anim-fade { animation: fadeIn 0.35s ease both; }
  .anim-slide { animation: slideInRight 0.35s ease both; }
  .anim-scale { animation: scaleIn 0.25s ease both; }
`;
