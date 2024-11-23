// src/Components/Footer.jsx
import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#F3CA4C] text-dark py-6">
            <div className="footer-container flex flex-wrap justify-around max-w-5xl mx-auto p-5">
                {/* Acerca de Nosotros */}
                <div className="footer-column flex-1 min-w-[250px] m-4">
                    <h3 className="text-dark mb-4 text-xl font-semibold">Acerca de Nosotros</h3>
                    <p className="hover:text-white">LocalBites es un sitio web destinado a la publicidad de comida local, ya sea de restaurantes o pymes que se quieran ir incluyendo en nuestro sitio web para tener mejor accesibilidad al público.</p>
                </div>

                {/* Enlaces Rápidos */}
                <div className="footer-column flex-1 min-w-[250px] m-4">
                    <h3 className="text-dark mb-4 text-xl font-semibold">Enlaces Rápidos</h3>
                    <ul className="space-y-2">
                        <li><a href="index.html" className="hover:text-white">Inicio</a></li>
                        <li><a href="#" className="hover:text-white">Restaurantes</a></li>
                        <li><a href="#" className="hover:text-white">Contacto</a></li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div className="footer-column flex-1 min-w-[250px] m-4">
                    <h3 className="text-yellow-400 mb-4 text-xl font-semibold">Redes Sociales</h3>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#" className="social-btn facebook w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-600 transition-colors" aria-label="Facebook">
                                {/* Icono de Facebook */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.353C0 23.408.593 24 1.324 24H12.8V14.706h-3.316v-3.68H12.8V8.413c0-3.289 2.009-5.084 4.943-5.084 1.407 0 2.615.103 2.966.15v3.437h-2.035c-1.596 0-1.906.759-1.906 1.87v2.45h3.811l-.497 3.68h-3.314V24h6.492c.732 0 1.325-.593 1.325-1.323V1.324C24 .593 23.408 0 22.676 0z"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="social-btn twitter w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-400 transition-colors" aria-label="Twitter">
                                {/* Icono de Twitter */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M23.954 4.57a10.049 10.049 0 0 1-2.825.775 4.942 4.942 0 0 0 2.165-2.724 10.07 10.07 0 0 1-3.127 1.184 4.92 4.92 0 0 0-8.39 4.482A13.978 13.978 0 0 1 1.67 3.149 4.917 4.917 0 0 0 3.15 9.794a4.904 4.904 0 0 1-2.23-.616v.06a4.92 4.92 0 0 0 3.95 4.827 4.902 4.902 0 0 1-2.224.085 4.922 4.922 0 0 0 4.599 3.417A9.867 9.867 0 0 1 0 19.539 13.944 13.944 0 0 0 7.548 21c9.142 0 14.307-7.721 14.307-14.422 0-.219-.005-.437-.015-.652A10.257 10.257 0 0 0 24 4.59a9.968 9.968 0 0 1-2.046.56z"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="social-btn instagram w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-pink-500 transition-colors" aria-label="Instagram">
                                {/* Icono de Instagram */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.425.415a4.88 4.88 0 0 1 1.772 1.153 4.884 4.884 0 0 1 1.153 1.772c.175.455.361 1.255.415 2.425.059 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.415 2.425a4.88 4.88 0 0 1-1.153 1.772 4.884 4.884 0 0 1-1.772 1.153c-.455.175-1.255.361-2.425.415-1.266.059-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.425-.415a4.88 4.88 0 0 1-1.772-1.153 4.884 4.884 0 0 1-1.153-1.772c-.175-.455-.361-1.255-.415-2.425-.059-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.415-2.425a4.88 4.88 0 0 1 1.153-1.772 4.884 4.884 0 0 1 1.772-1.153c.455-.175 1.255-.361 2.425-.415 1.266-.059 1.646-.07 4.85-.07zm0-2.163C8.745 0 8.333.012 7.05.07 5.67.129 4.608.335 3.736.673a6.879 6.879 0 0 0-2.496 1.624A6.89 6.89 0 0 0 .673 3.736C.335 4.608.129 5.67.07 7.05.012 8.333 0 8.745 0 12c0 3.255.012 3.667.07 4.95.059 1.38.265 2.442.603 3.314a6.879 6.879 0 0 0 1.624 2.496 6.889 6.889 0 0 0 2.496 1.624c.872.338 1.934.544 3.314.603 1.283.059 1.695.07 4.95.07s3.667-.012 4.95-.07c1.38-.059 2.442-.265 3.314-.603a6.879 6.879 0 0 0 2.496-1.624 6.889 6.889 0 0 0 1.624-2.496c.338-.872.544-1.934.603-3.314.059-1.283.07-1.695.07-4.95s-.012-3.667-.07-4.95c-.059-1.38-.265-2.442-.603-3.314a6.879 6.879 0 0 0-1.624-2.496A6.889 6.889 0 0 0 20.264.673C19.392.335 18.33.129 16.95.07 15.667.012 15.255 0 12 0z"/>
                                    <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom text-center pt-5 border-t border-gray-600">
                <p className="text-dark">&copy; {year} LocalBites.</p>
            </div>
        </footer>
    );
};

export default Footer;
