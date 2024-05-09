import { useEffect, useState } from "react";

function useDebounce(input) {
  const [val, setVal] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVal(input);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return val;
}

export default useDebounce;
