import TableUsers from './table'

export default function ListUsers() {
    return (
        <div className='px-6 md:px-40'>
            <p className='font-semibold py-5 text-lg text-gray-900 select-none'>Listado de usuarios</p>
            <TableUsers />
        </div>
    )
}
