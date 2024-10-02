import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import SelectGender from "./selectgender";

export default function FormEdit({ isOpen, onClose, selectedData }) {

    const notify = () => toast.success('Datos modificados correctamente.',
    );

    if (!selectedData) return null;

    const closeModal = () => {
        onClose(false);
    };
    const initialValues = {
        nameuser: selectedData ? selectedData.nameuser : '',
        gender: selectedData.gender,
        location: selectedData.location,
        phone: selectedData.phone,
        email: selectedData.email,
        country: selectedData.country,
        iduser: selectedData.id
    };

    const validationSchema = Yup.object({
        nameuser: Yup.string().required('El nombre es obligatorio'),
        gender: Yup.string().required('El género es obligatorio'),
        location: Yup.string().required('La dirección es obligatoria'),
        phone: Yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, 'El número de teléfono debe tener el formato XXX-XXX-XXXX').required('El número de teléfono es obligatorio'),
        email: Yup.string().email('El correo electrónico debe ser válido').required('El correo es obligatorio'),
        country: Yup.string().required('El país es obligatorio')
    }

    )
    const apiurl = process.env.NEXT_PUBLIC_URL_API
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Editar usuario</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        try {
                                            const response = await fetch(`${apiurl}/${initialValues.iduser}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'content-type': 'application/json',
                                                },
                                                body: JSON.stringify(values),

                                            });

                                            if (!response.ok) {
                                                throw new Error('Error al actualizar los datos');
                                            }
                                            closeModal()

                                        } catch (error) {
                                        } finally {
                                            setSubmitting(false);
                                        }
                                    }
                                    }
                                >
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form autoComplete="off">
                                            <div className="mt-1 mb-5 grid grid-cols-6 gap-6 md:px-2">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="nameuser"
                                                        className="block text-sm font-medium text-gray-700 select-none"
                                                    >
                                                        Nombre
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="nameuser"
                                                        id="nameuser"
                                                        aria-label="nameuser"
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.nameuser && touched.nameuser ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' : 'border-slate-300'} rounded-md text-sm capitalize placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                                        placeholder="Jhon Doe"
                                                    />
                                                    <ErrorMessage
                                                        name="nameuser"
                                                        component="p"
                                                        className="mt-2 text-pink-600 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="gender"
                                                        className="block text-sm font-medium text-gray-700 select-none"
                                                    >
                                                        Género
                                                    </label>
                                                    <SelectGender errors={errors} touched={touched} />
                                                    <ErrorMessage
                                                        name="gender"
                                                        component="p"
                                                        className="mt-2 text-pink-600 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="location"
                                                        className="block text-sm font-medium text-gray-700 select-none"
                                                    >
                                                        Dirección
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="location"
                                                        id="location"
                                                        aria-label="location"
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.location && touched.location ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' : 'border-slate-300'} rounded-md text-sm capitalize placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                                        placeholder="avenue"
                                                    />
                                                    <ErrorMessage
                                                        name="location"
                                                        component="p"
                                                        className="mt-2 text-pink-600 text-sm"
                                                    />

                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium text-gray-700 select-none"
                                                    >
                                                        Teléfono
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        maxLength={12}
                                                        aria-label="phone"
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.phone && touched.phone ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' : 'border-slate-300'} rounded-md text-sm capitalize placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                                        placeholder="123-456-7834"
                                                    />
                                                    <ErrorMessage
                                                        name="phone"
                                                        component="p"
                                                        className="mt-2 text-pink-600 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium text-gray-700 select-none"
                                                    >
                                                        Correo electrónico
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        aria-label="email"
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.email && touched.email ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' : 'border-slate-300'} rounded-md text-sm capitalize placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                                        placeholder="jhondoe@gmail.com"
                                                    />
                                                    <ErrorMessage
                                                        name="email"
                                                        component="p"
                                                        className="mt-2 text-pink-600 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="country"
                                                        className="block text-sm font-medium text-gray-700 select-none"
                                                    >
                                                        País
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="country"
                                                        id="country"
                                                        aria-label="country"
                                                        className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.country && touched.country ? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500' : 'border-slate-300'} rounded-md text-sm capitalize placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                                                        placeholder="France"
                                                    />
                                                    <ErrorMessage
                                                        name="country"
                                                        component="p"
                                                        className="mt-2 text-pink-600 text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <ModalFooter>
                                                <Button color="default" variant="light" onPress={onClose}>
                                                    Cancelar
                                                </Button>
                                                <Button onClick={notify
                                                } type="submit" color="primary" disabled={isSubmitting}>
                                                    <Toaster />
                                                    Guardar cambios
                                                </Button>
                                            </ModalFooter>
                                        </Form>
                                    )}
                                </Formik>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
