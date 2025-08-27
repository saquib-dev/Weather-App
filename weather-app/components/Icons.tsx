import React, { FC, SVGProps } from 'react';

export const IconSun: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export const IconMoon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export const IconCloud: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

export const IconCloudSun: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m17.66 17.66 1.41 1.41"/><path d="M12 20v2"/><path d="m5.64 17.66-1.41 1.41"/><path d="M4 12H2"/><path d="m6.34 6.34-1.41-1.41"/><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
);

export const IconCloudMoon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.2 2.2a.9.9 0 0 0-.4-.3 2 2 0 0 0-2.3.4 3.4 3.4 0 0 1-.3 4.6 3.4 3.4 0 0 1-4.6.3 2 2 0 0 0-.4 2.3.9.9 0 0 0 .3.4 8 8 0 0 0 12.5 7.2A7.9 7.9 0 0 0 18 10c0-4.4-3.6-8-8-8a7.9 7.9 0 0 0-2.2.3Z"/><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
);

export const IconCloudDrizzle: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 19v1"></path><path d="M8 14v1"></path><path d="M16 19v1"></path><path d="M16 14v1"></path><path d="M12 21v1"></path><path d="M12 16v1"></path><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
  </svg>
);

export const IconCloudRain: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 13v8"></path><path d="M8 13v8"></path><path d="M12 15v8"></path><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
  </svg>
);

export const IconCloudSnow: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
    <line x1="8" y1="16" x2="8" y2="16"></line><line x1="8" y1="20" x2="8" y2="20"></line>
    <line x1="12" y1="18" x2="12" y2="18"></line><line x1="12" y1="22" x2="12" y2="22"></line>
    <line x1="16" y1="16" x2="16" y2="16"></line><line x1="16" y1="20" x2="16" y2="20"></line>
  </svg>
);

export const IconCloudFog: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 17.5A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
    <path d="M2 20h20" />
    <path d="M6 16h12" />
  </svg>
);

export const IconCloudLightning: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
    <path d="m13 12-3 5h4l-3 5"></path>
  </svg>
);


export const IconWind: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
  </svg>
);

export const IconMapPin: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export const IconNavigation: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

export const IconDroplet: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
    </svg>
);