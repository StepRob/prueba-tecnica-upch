'use client'
import fetchCountry, { getUniqueCountry } from "@/api/fetchCountry";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";


export default function FilterCountry() {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    const { data, error, isLoading } = useSWR(apiUrl, fetchCountry)

    const [country, setCountry] = useState([]);

    useEffect(() => {
        if (data) {
            setCountry(getUniqueCountry(data));
        }
    }, [data])

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
                {country.map((country, index) => (
                    <AutocompleteItem key={index} value={country}>
                        {country}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    )
}