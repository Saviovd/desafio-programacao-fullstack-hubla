import { useState, useEffect } from "react";

const useWindowSize = () => {
  // Modificando o tipo para aceitar 'number' ou 'undefined'
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Verifica se o código está sendo executado no lado do cliente
    if (typeof window !== "undefined") {
      // Define o tamanho da janela assim que o componente for montado
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Inicializa o estado de tamanho da janela
      handleResize();

      // Adiciona o listener de resize
      window.addEventListener("resize", handleResize);

      // Remove o listener quando o componente for desmontado
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // O efeito é executado uma vez quando o componente é montado

  return windowSize;
};

export default useWindowSize;
