import fetchGender, { getUniqueGenders } from "@/api/fetchGender";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function FilterGender() {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    const { data, error, isLoading } = useSWR(apiUrl, fetchGender)

    const [genders, setGenders] = useState([]);

    useEffect(() => {
        if (data) {
            setGenders(getUniqueGenders(data));
        }
    }, [data]);

    if (error) return <div>fallo petición</div>
    if (isLoading) return <div>cargando..</div>
    return (
        <div className="w-full max-w-md px-4">
            <Autocomplete
                aria-hidden
                aria-label="gender"
                labelPlacement="outside"
                className="max-w-xs"
                placeholder="Selecciona género"
            >
                {genders.map((gender, index) => (
                    <AutocompleteItem key={index} value={gender}>
                        {gender}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}