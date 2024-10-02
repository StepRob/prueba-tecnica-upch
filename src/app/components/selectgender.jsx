'use client'
import fetchGender, { getUniqueGenders } from "@/api/fetchGender"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { Field } from 'formik';


export default function SelectGender({ errors, touched }) {
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
        <Field
            as="select"
            name="gender"
            id="gender"
            aria-label="gender"
            className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.gender && touched.gender ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' : 'border-slate-300'} rounded-md text-sm capitalize placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}>
            {genders.map((gender, index) => (
                <option className="w-2" key={index} value={gender}>
                    {gender}
                </option>
            ))}
        </Field>

    )
}
