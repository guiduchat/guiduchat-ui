import { useId } from 'react';

import styles from './ProviderLogo.module.scss';

export type ReviewProviderName = 'google' | 'tripadvisor';

// Logos oficiais, com as cores das marcas (mesma exceção do logo do Google no SocialButton). Não usam
// tokens de tema: o desenho do Tripadvisor tem o círculo verde de fundo, então o traço escuro aparece nos dois temas.
const GoogleSvg = () => {
  const logoId = `g${useId().replace(/:/g, '')}-`;
  return (
    <svg viewBox="0 0 268.15 273.88" focusable="false" aria-hidden>
      <defs>
        <clipPath id={`${logoId}clip`}><path fill="none" d="M265.58,111.54h-128.64v52.65h73.920c-1.19,7.45-3.86,14.78-7.76,21.46-4.48,7.660-10.01,13.49-15.68,17.93-16.99,13.3-36.8,16.02-50.56,16.02-34.76,0-64.45-22.94-75.95-54.12-.46-1.13-.77-2.3-1.15-3.46-2.54-7.93-3.930-16.34-3.930-25.07s1.5-17.79,4.24-26.01c10.81-32.41,41.18-56.62,76.81-56.62,7.17,0,14.07.87,20.61,2.61,14.96,3.97,25.54,11.79,32.02,17.98l39.12-39.13C204.82,13.5,173.8,0,136.8,0c-29.58,0-56.89,9.41-79.27,25.32-18.150,12.9-33.03,30.17-43.08,50.23C5.12,94.15,0,114.77,0,136.93s5.12,42.99,14.47,61.42v.12c9.87,19.56,24.3,36.41,41.84,49.25,15.32,11.22,42.8,26.16,80.49,26.16,21.68,0,40.89-3.99,57.83-11.47,12.22-5.4,23.05-12.44,32.86-21.48,12.96-11.95,23.1-26.74,30.03-43.75,6.93-17.01,10.63-36.25,10.63-57.1,0-9.71-.96-19.58-2.57-28.54h0Z" /></clipPath>
        <radialGradient id={`${logoId}rg`} cx="-467.62" cy="315.65" fx="-467.62" fy="315.65" r="71.46" gradientTransform="translate(949.39 -696.32) rotate(-92.34) scale(1.91 -2.81)" gradientUnits="userSpaceOnUse">
          <stop offset=".14" stopColor="#1abd4d" />
          <stop offset=".25" stopColor="#6ec30d" />
          <stop offset=".31" stopColor="#8ac502" />
          <stop offset=".37" stopColor="#a2c600" />
          <stop offset=".45" stopColor="#c8c903" />
          <stop offset=".54" stopColor="#ebcb03" />
          <stop offset=".62" stopColor="#f7cd07" />
          <stop offset=".7" stopColor="#fdcd04" />
          <stop offset=".77" stopColor="#fdce05" />
          <stop offset=".86" stopColor="#ffce0a" />
        </radialGradient>
        <radialGradient id={`${logoId}rg2`} cx="72.53" cy="398.44" fx="72.53" fy="398.44" r="47.85" gradientTransform="translate(82.44 1090.54) scale(1.98 -2.55)" gradientUnits="userSpaceOnUse">
          <stop offset=".41" stopColor="#fb4e5a" />
          <stop offset="1" stopColor="#ff4540" />
        </radialGradient>
        <radialGradient id={`${logoId}rg3`} cx="-488.88" cy="325.9" fx="-488.88" fy="325.9" r="71.46" gradientTransform="translate(-278.42 1304.05) rotate(151.02) scale(2.12 2.88)" gradientUnits="userSpaceOnUse">
          <stop offset=".23" stopColor="#ff4541" />
          <stop offset=".31" stopColor="#ff4540" />
          <stop offset=".46" stopColor="#ff4640" />
          <stop offset=".54" stopColor="#ff473f" />
          <stop offset=".7" stopColor="#ff5138" />
          <stop offset=".77" stopColor="#ff5b33" />
          <stop offset=".86" stopColor="#ff6c29" />
          <stop offset="1" stopColor="#ff8c18" />
        </radialGradient>
        <radialGradient id={`${logoId}rg4`} cx="-514.07" cy="445.06" fx="-514.07" fy="445.06" r="71.46" gradientTransform="translate(-2312.42 -1447.27) rotate(-127.45) scale(5.53 2.04)" gradientUnits="userSpaceOnUse">
          <stop offset=".13" stopColor="#0cba65" />
          <stop offset=".21" stopColor="#0bb86d" />
          <stop offset=".3" stopColor="#09b479" />
          <stop offset=".4" stopColor="#08ad93" />
          <stop offset=".48" stopColor="#0aa6a9" />
          <stop offset=".57" stopColor="#0d9cc6" />
          <stop offset=".67" stopColor="#1893dd" />
          <stop offset=".77" stopColor="#258bf1" />
          <stop offset=".86" stopColor="#3086ff" />
        </radialGradient>
        <radialGradient id={`${logoId}rg5`} cx="-180.92" cy="273.22" fx="-180.92" fy="273.22" r="71.46" gradientTransform="translate(857.45 485.98) rotate(96.62) scale(2.07 2.86)" gradientUnits="userSpaceOnUse">
          <stop offset=".37" stopColor="#ff4e3a" />
          <stop offset=".46" stopColor="#ff8a1b" />
          <stop offset=".54" stopColor="#ffa312" />
          <stop offset=".62" stopColor="#ffb60c" />
          <stop offset=".77" stopColor="#ffcd0a" />
          <stop offset=".86" stopColor="#fecf0a" />
          <stop offset=".92" stopColor="#fecf08" />
          <stop offset="1" stopColor="#fdcd01" />
        </radialGradient>
        <radialGradient id={`${logoId}rg6`} cx="-322.09" cy="622.03" fx="-322.09" fy="622.03" r="41.1" gradientTransform="translate(-2606.14 -1650.03) rotate(132.12) scale(1.78 -5.03)" gradientUnits="userSpaceOnUse">
          <stop offset=".32" stopColor="#ff4c3c" />
          <stop offset=".6" stopColor="#ff692c" />
          <stop offset=".73" stopColor="#ff7825" />
          <stop offset=".88" stopColor="#ff8d1b" />
          <stop offset="1" stopColor="#ff9f13" />
        </radialGradient>
        <radialGradient id={`${logoId}rg7`} cx="-614.81" cy="493.45" fx="-614.81" fy="493.45" r="71.46" gradientTransform="translate(-278.42 -1581.42) rotate(-151.02) scale(2.12 -2.88)" gradientUnits="userSpaceOnUse">
          <stop offset=".23" stopColor="#0fbc5f" />
          <stop offset=".31" stopColor="#0fbc5f" />
          <stop offset=".37" stopColor="#0fbc5e" />
          <stop offset=".46" stopColor="#0fbc5d" />
          <stop offset=".54" stopColor="#12bc58" />
          <stop offset=".7" stopColor="#28bf3c" />
          <stop offset=".77" stopColor="#38c02b" />
          <stop offset=".86" stopColor="#52c218" />
          <stop offset=".92" stopColor="#67c30f" />
          <stop offset="1" stopColor="#86c504" />
        </radialGradient>
        <linearGradient id={`${logoId}lg`} x1="240.27" y1="15.08" x2="275.04" y2="15.08" gradientTransform="translate(-109.88 260.68) scale(.96 -.99)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0fbc5c" />
          <stop offset="1" stopColor="#0cba65" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${logoId}clip)`}>
        <path fill={`url(#${logoId}rg)`} d="M-1.97,137.86c.14,21.81,6.23,44.32,15.44,62.49v.13c6.66,13.19,15.75,23.62,26.11,33.94l62.58-23.32c-11.840-6.14-13.65-9.91-22.13-16.77-8.67-8.93-15.14-19.19-19.16-31.21h-.16l.16-.13c-2.65-7.94-2.91-16.37-3.01-25.13H-1.97Z" />
        <path fill={`url(#${logoId}rg2)`} d="M136.93-1c-6.19,22.19-3.82,43.77,0,56.32,7.14,0,14.02.88,20.55,2.61,14.96,3.97,25.53,11.79,32.02,17.98l40.12-40.13C205.85,13.53,177.25-.96,136.93-1Z" />
        <path fill={`url(#${logoId}rg3)`} d="M136.8-1.17c-30.34,0-58.35,9.65-81.3,25.97-8.52,6.06-16.34,13.06-23.31,20.84-1.82,17.48,13.66,38.97,44.31,38.79,14.87-17.67,36.87-29.11,61.36-29.11.02,0,.04,0,.07,0l-1-56.49s-.09,0-.13,0Z" />
        <path fill={`url(#${logoId}rg4)`} d="M236.93,144.19l-27.08,19c-1.19,7.45-3.86,14.78-7.77,21.46-4.48,7.66-10.01,13.49-15.68,17.93-16.96,13.27-36.72,16-50.47,16.02-14.22,24.73-16.71,37.12,1,57.08,21.91-.02,41.34-4.06,58.48-11.62,12.39-5.47,23.36-12.6,33.3-21.77,13.13-12.11,23.41-27.1,30.43-44.34,7.02-17.24,10.77-36.73,10.77-57.87l-32.98,4.11Z" />
        <path fill="#3086ff" d="M134.93,109.54v56.65h130.28c1.15-7.76,4.94-17.8,4.94-26.11,0-9.71-.95-21.58-2.57-30.54h-132.64Z" />
        <path fill={`url(#${logoId}rg5)`} d="M32.81,43.64c-8.04,8.98-14.91,19.04-20.35,29.92C3.12,92.15-2,114.77-2,136.93c0,.31.03.62.03.93,4.14,8.1,57.16,6.55,59.83,0,0-.31-.04-.6-.04-.91,0-9.09,1.5-15.79,4.24-24.01,3.38-10.14,8.67-19.47,15.44-27.51,1.53-2,5.63-6.3,6.82-8.88.45-.98-.83-1.53-.9-1.88-.08-.39-1.8-.08-2.18-.36-1.22-.92-3.64-1.39-5.11-1.82-3.14-.91-8.34-2.91-11.23-4.99-9.13-6.56-23.39-14.4-32.09-23.86h0Z" />
        <path fill={`url(#${logoId}rg6)`} d="M65.1,74.7c21.18,13.11,27.27-6.61,41.36-12.79l-24.5-51.89c-9.010,3.87-17.53,8.67-25.43,14.29-11.8,8.39-22.22,18.62-30.82,30.27l39.39,20.12Z" />
        <path fill={`url(#${logoId}rg7)`} d="M73.72,207.09c-28.43,10.48-32.89,10.86-35.5,28.86,5,4.99,10.38,9.6,16.09,13.78,15.32,11.22,44.8,26.16,82.49,26.16.04,0,.09,0,.13,0v-58.29s-.06,0-.09,0c-14.12,0-25.4-3.79-36.96-10.37-2.85-1.62-8.02,2.74-10.65.79-3.63-2.69-12.36,2.32-15.5-.92h0Z" />
        <path fill={`url(#${logoId}lg)`} opacity=".5" style={{ isolation: 'isolate' }} d="M120.28,215.76v59.11c5.27.63,10.76,1.01,16.52,1.01s11.36-.3,16.78-.86v-58.87c-6.08,1.06-11.81,1.44-16.74,1.44-5.680,0-11.210-.68-16.56-1.84Z" />
      </g>
    </svg>
  );
};

const TripadvisorSvg = () => (
  <svg viewBox="0 0 600 450" focusable="false" aria-hidden>
    <circle cx="300.1" cy="225.4" r="160.8" fill="#63BB94" />
    <path
      fill="#010202"
      d="M399.8,193.2l19.3-20.9h-43.4c-20.9-14.5-48.2-22.5-75.6-22.5s-54.7,8-75.6,22.5h-43.4l19.3,20.9c-11.3,11.3-19.3,25.7-19.3,43.4c0,32.2,27.3,59.5,59.5,59.5c16.1,0,28.9-6.4,40.2-16.1l19.3,20.9l19.3-20.9c11.3,9.6,24.1,16.1,40.2,16.1c32.2,0,59.5-27.3,59.5-59.5C419.1,220.5,411.1,204.5,399.8,193.2z M240.6,278.4c-22.5,0-40.2-17.7-40.2-40.2s17.7-40.2,40.2-40.2s40.2,17.7,40.2,40.2S263.1,278.4,240.6,278.4z M300.1,236.6c0-25.7-19.3-48.2-45-59.5c14.5-4.8,28.9-8,45-8c16.1,0,30.6,3.2,45,9.6C319.4,188.4,300.1,210.9,300.1,236.6z M359.6,278.4c-22.5,0-40.2-17.7-40.2-40.2s17.7-40.2,40.2-40.2c22.5,0,40.2,17.7,40.2,40.2S382.1,278.4,359.6,278.4z M359.6,217.3c-11.3,0-20.9,9.6-20.9,20.9c0,11.3,9.6,20.9,20.9,20.9c11.3,0,20.9-9.6,20.9-20.9C380.5,227,370.9,217.3,359.6,217.3z M261.5,238.2c0,11.3-9.6,20.9-20.9,20.9c-11.3,0-20.9-9.6-20.9-20.9c0-11.3,9.6-20.9,20.9-20.9S261.5,227,261.5,238.2z"
    />
  </svg>
);

interface ProviderLogoProps {
  provider: ReviewProviderName
  /** Nome para o leitor de tela, vindo do app ("Google", "Tripadvisor"). */
  label: string
}

/** Logo do provedor das avaliações, com nome acessível. */
export const ProviderLogo = ({ provider, label }: ProviderLogoProps) => (
  <span className={styles.ProviderLogo} role="img" aria-label={label}>
    {provider === 'google' ? <GoogleSvg /> : <TripadvisorSvg />}
  </span>
);
