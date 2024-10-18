import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, HomeIcon, BuildingStorefrontIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const activeStyle = 'underline underline-offset-4'

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    return (
        <nav className='fixed z-10 top-0 w-full bg-teal-700 text-white'>
            {/* Encabezado y menú de navegación */}
            <div className='flex justify-between items-center px-8 py-5'>
                {/* Sección izquierda: Sabores de Barrio y enlaces */}
                <div className='flex items-center gap-8'>
                    <div className="text-xl font-bold">
                        Sabores de Barrio
                    </div>
                    {/* Menú para pantallas grandes */}
                    <ul className='hidden md:flex items-center gap-6'>
                        <li>
                            <NavLink to='/' className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/locales' className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }>
                                Locales
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/contacto' className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }>
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Sección derecha: Link de Contacto */}
                <ul className='hidden md:flex items-center gap-6'>
                    <li>
                        <NavLink to='/login' activeClassName="underline underline-offset-4">
                            Iniciar sesión
                        </NavLink>
                    </li>
                </ul>

                {/* Botón hamburguesa (solo visible en móviles) */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <XMarkIcon className="h-8 w-8 text-white" />
                        ) : (
                            <Bars3Icon className="h-8 w-8 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menú desplegable para móviles con animación */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
                    isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className='flex flex-col items-center gap-3 w-full bg-teal-600 text-white md:hidden'>
                    <li className="flex items-center gap-2 w-full px-4 py-2 border-b border-teal-500">
                        <HomeIcon className="h-5 w-5" />
                        <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            Inicio
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 w-full px-4 py-2 border-b border-teal-500">
                        <BuildingStorefrontIcon className="h-5 w-5" />
                        <NavLink
                        to='/locales'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            Locales
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 w-full px-4 py-2 border-b border-teal-500">
                        <PhoneIcon className="h-5 w-5" />
                        <NavLink
                        to='/contacto'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            Contacto
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 w-full px-4 py-2 border-b border-teal-500">
                        <UserCircleIcon className="h-5 w-5" />
                        <NavLink
                        to='/login'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            Iniciar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

