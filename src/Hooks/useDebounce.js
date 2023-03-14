import { useEffect } from "react";

const useDebounceEffect = (effect, deps, delay) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);
        return () => clearTimeout(handler);

    }, [...(deps || []), delay]);
};

export default useDebounceEffect;