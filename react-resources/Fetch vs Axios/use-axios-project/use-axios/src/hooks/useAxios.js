import axios from "axios";
import { useMemo, useCallback } from "react";

export default function useAxios() {

    const api = useMemo(() => axios.create({
        baseURL: "https://pokeapi.co/api/v2/",
        headers: {
            "Content-Type": "application/json",
        },
    }), []);

    const fetch = useCallback(async (path, options = {}) => {
        return await api.get(path, options)
    }, [api]);

    return { fetch }
}