import { debounce } from "lodash";
import { useCallback, useEffect } from "react";

export const DebounceHook = ({ handleAction }) => {
  const useDebounceForUpdate = useCallback(
    debounce((value) => {
        console.log('excuted')
      handleAction({ type: "UpdateHistory" });
    }, 300),
    []
  );

  useEffect(() => {
    // Cleanup the debounce on component unmount
    return () => {
      useDebounceForUpdate.cancel();
    };
  }, [useDebounceForUpdate]);

  return { useDebounceForUpdate };
};
