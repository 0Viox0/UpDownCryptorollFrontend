export const currentHost = import.meta.env.DEV
    ? 'http://172.27.33.20:5173' //'http://localhost:5173'
    : import.meta.env.VITE_CURRENT_HOST;
export const backendUrl = import.meta.env.DEV
    ? 'http://172.27.33.20:5089'
    : import.meta.env.VITE_BACKEND_URL;

export const manifestUrl =
    'https://raw.githubusercontent.com/Incept10n/BUFF/refs/heads/master/tonconnect-manifest.json';

export const tgLink = 'https://telegram.org/';
export const twitterLink = 'https://x.com/';
export const vkLink = 'https://vk.com/';
export const landingPageUrl = import.meta.env.DEV
    ? '/landing-page' //'http://localhost:4173'
    : import.meta.env.VITE_LANDING_PAGE_LINK;
