import  { useEffect } from 'react';

const CallbellChat = () => {
  useEffect(() => {
    // Crear el script del widget de Callbell
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.innerHTML = `
      window.callbellSettings = {
        token: "JX7g5kMymy4eD9mzi4QM21Uu"
      };
    `;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.src = 'https://dash.callbell.eu/include/JX7g5kMymy4eD9mzi4QM21Uu.js';
    document.head.appendChild(script2);

    // Limpiar scripts al desmontar el componente
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null; // Este componente no necesita renderizar nada
};

export default CallbellChat;
