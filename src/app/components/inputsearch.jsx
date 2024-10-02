import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'
import { Input } from '@nextui-org/react'

export default function InputSearch({ filterValue, onClear, onSearchChange }) {
    return (
        <div className='flex flex-col px-8 mt-5'>
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap mt-8">
                <Input
                    isClearable
                    aria-label='search'
                    labelPlacement="outside"
                    startContent={<MagnifyingGlassCircleIcon className="text-gray-400 size-8" />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                    placeholder="Buscar usuario por nombre o correo"
                />
            </div>
        </div>
    )
}
