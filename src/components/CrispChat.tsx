import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    // Check if we're in development mode
    const isDev = import.meta.env.DEV;

    // Only load Crisp in production
    if (isDev) {
      return;
    }

    // Check if Crisp is already loaded
    if (window.$crisp) {
      return;
    }

    // Initialize Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'b79420e3-0975-4227-a6fc-2e41c8245909';

    // Create and append the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://client.crisp.chat/l.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

// Extend the Window interface to include Crisp types
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default CrispChat;
