import { useState, useEffect } from "react";

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowWidth, setWindowWidth] = useState(
    isWindowClient ? window.innerWidth : undefined
  );

  const [windowHeight, setWindowHeight] = useState(
    isWindowClient ? window.innerHeight : undefined
  )

  useEffect(() => {
    function setSize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    if (isWindowClient) {
      //register the window resize listener
      window.addEventListener("resize", setSize);

      //un-register the listener
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowWidth, setWindowHeight]);


  return {windowWidth, windowHeight};
}

export default useWindowSize;