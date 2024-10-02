'use client'
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import FilterCountry from "./filtercountry";
import FilterGender from "./filtergender";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function ViewFilter({ filters, handleFilterChange }) {
    return (
        <Accordion variant="shadow" aria-hidden aria-labelledby="accordion">
            <AccordionItem startContent={<AdjustmentsHorizontalIcon className="size-5" />} key="1" aria-labelledby="filtros" title="Filtros">
                <div className="grid sm:grid-cols-8 gap-2 mb-6">
                    <div className="sm:col-span-3">
                        <FilterGender valueGender={filters} onChangeGender={(newGender) => handleFilterChange({ ...filters, gender: newGender })} />

                    </div>
                    <div className="sm:col-span-3">
                        <FilterCountry filters={filters} onChangeFilter={(newFilters) => handleFilterChange(newFilters)} />
                    </div>
                    <div className="sm:col-span-2">
                        <Button onClick={handleFilterChange} className='w-full' color='primary' startContent={<MagnifyingGlassIcon className="size-5" />}>Buscar</Button>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    )
}
