import { useEffect, useRef } from "react";

export function useUpdate(fn, keys) {
  const mount = useRef(false);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
    } else {
      return fn();
    }
  }, keys);
}
