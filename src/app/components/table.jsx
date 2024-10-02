'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Avatar, Tooltip, Select, SelectItem, Pagination } from "@nextui-org/react";
import LoadSkeleton from './skeleton'
import useSWR from 'swr'
import fetchData from '@/api/fetchData';
import FormEdit from "./formEdit";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo, useState } from "react";
import InputSearch from "./inputsearch";
import ModalDeleteUser from "./modaldelete";
import ViewFilter from "./viewfilter";

export default function TableUsers() {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;
    const { data, error, isLoading } = useSWR(apiUrl, fetchData, { refreshInterval: 1000 })

    //Búsqueda de usario por nombre e email
    const [searchValue, setSearchValue] = useState("");
    const searchItems = useMemo(() => {
        if (!data) return [];
        if (searchValue) {
            return data.filter(
                (item) =>
                    item.nameuser.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchValue.toLowerCase()),
            );
        }
        return data;
    }, [data, searchValue]);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setSearchValue(value);
            setPage(1);
        } else {
            setSearchValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setSearchValue("");
        setPage(1);
    }, []);

    // Paginación de tabla
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const pages = Math.ceil(searchItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return searchItems.slice(start, end);
    }, [page, searchItems, rowsPerPage]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const numberPerPage = [
        {
            label: "5",
            value: "5",
        },
        {
            label: "10",
            value: "10",
        },
        {
            label: "15",
            value: "15",
        },
    ];

    //Controlar estados de modal
    const [selectedDataEdit, setSelectedDataEdit] = useState(null);
    const [isModalEditOpen, setIsEditModalOpen] = useState(false);

    const [selectedDataDelete, setSelectedDataDelete] = useState(null);
    const [isModalDeleteOpen, setIsDeleteModalOpen] = useState(false)

    const handleEditUser = (rowData) => {
        setSelectedDataEdit(rowData);
        setIsEditModalOpen(true);
    };
    const closeModalEdit = () => {
        setIsEditModalOpen(false);
        setSelectedDataEdit(null);
    };

    const handleDeleteUser = (rowData) => {
        setSelectedDataDelete(rowData)
        setIsDeleteModalOpen(true)
    };
    const closeModalDelete = () => {
        setIsDeleteModalOpen(false)
    }

    if (error) return <div>fallo petición</div>
    if (isLoading) return <LoadSkeleton />

    return (
        <div className="mb-10 border shadow rounded-lg">
            <div className='px-8 mt-8 w-auto'>
                <ViewFilter />
            </div>

            <InputSearch filterValue={searchValue} onClear={() => onClear()} onSearchChange={onSearchChange} />
            <div className="p-8">
                <Table
                    aria-label="table dates users"
                    removeWrapper
                    selectionMode="multiple"
                    classNames={{
                        base: "max-h-[520px] overflow-y-scroll scrollbar-hidden",
                    }}
                >
                    <TableHeader>
                        <TableColumn className="h-12 text-sm text-navy-700">Nombre</TableColumn>
                        <TableColumn className="h-12 text-sm text-navy-700">Género</TableColumn>
                        <TableColumn className="h-12 text-sm text-navy-700">Dirección</TableColumn>
                        <TableColumn className="h-12 text-sm text-navy-700">Teléfono</TableColumn>
                        <TableColumn className="h-12 text-sm text-navy-700">País</TableColumn>
                        <TableColumn className="h-12 text-sm text-navy-700">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No se encontraron coincidencias"}>
                        {items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="h-auto w-auto">
                                                <Avatar
                                                    src={row.avatar}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">{row.nameuser}</div>
                                            <div className="text-sm opacity-50">{row.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>
                                    {row.city}
                                    <br />
                                    <span className="inline-flex items-center bg-gray-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                                        {row.number}
                                    </span>
                                </TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <Tooltip content="Editar usuario">
                                            <Button onClick={() => handleEditUser(row)} variant="light" isIconOnly>
                                                <PencilIcon className="size-5 text-primary-400" />
                                            </Button>
                                        </Tooltip>

                                        <Tooltip color="danger" content="Eliminar usuario">
                                            <Button onClick={() => handleDeleteUser(row)} variant="light" isIconOnly>
                                                <TrashIcon className="size-5 text-danger" />
                                            </Button>

                                        </Tooltip>
                                    </div>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-8 flex w-full select-none items-center justify-between">
                    <span className="text-small text-navy-300">
                        Total de registros: {data.length}
                    </span>
                    <div className="flex">
                        <div className="hidden md:flex items-center">
                            <p className="mr-2 text-small text-navy-300">
                                Filas por página:
                            </p>
                            <div className="mr-10">
                                <Select
                                    labelPlacement="outside"
                                    aria-label="select"
                                    className="w-20"
                                    defaultSelectedKeys={["5"]}
                                    onChange={onRowsPerPageChange}
                                >
                                    {numberPerPage.map((number) => (
                                        <SelectItem key={number.value} value={number.value}>
                                            {number.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                </div>
            </div>
            <FormEdit isOpen={isModalEditOpen} onClose={closeModalEdit} selectedData={selectedDataEdit} />
            <ModalDeleteUser isOpen={isModalDeleteOpen} closeModal={closeModalDelete} selectedData={selectedDataDelete} />

        </div>
    )
}
