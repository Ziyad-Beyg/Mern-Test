import { useRef, useEffect } from "react";

export function useEffectAfterMount(callback, dependencies) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return callback();
    } else {
      didMountRef.current = true;
    }
  }, dependencies);
}
