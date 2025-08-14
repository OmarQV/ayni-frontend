import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const location = useLocation();

    const connectWallet = () => {
        // Simulación de conexión de wallet
        if (!isWalletConnected) {
            setIsWalletConnected(true);
            setWalletAddress('0x1234...5678');
        } else {
            setIsWalletConnected(false);
            setWalletAddress('');
        }
    };

    // Verifica si la ruta actual coincide con el enlace
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar bg-gray-900 shadow-lg px-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                {/* Logo/Nombre del proyecto con fondo oscuro */}
                <div className="navbar-start">
                    <Link to="/Home" className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
                        <span className="text-2xl font-bold text-white hover:text-accent transition-colors">
                            Ayni
                        </span>
                        <span className="ml-2 px-2 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                            Beta
                        </span>
                    </Link>
                </div>

                {/* Menu principal (desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/home"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                                    isActive("/home")
                                        ? 'text-white bg-primary'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link 
                                to="/destinations"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                                    isActive("/destinations") 
                                        ? 'text-white bg-primary' 
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Destinos
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/mapa"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                                    isActive("/mapa")
                                        ? 'text-white bg-primary'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Mapa
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/Register"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                                    isActive("/Register")
                                        ? 'text-white bg-secondary'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Register
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/profile"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                                    isActive("/profile") 
                                        ? "text-white bg-accent" 
                                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                                }`}
                            >
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Botón de Wallet */}
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 rounded-box w-52 border border-gray-700 mt-2">
                            {isWalletConnected ? (
                                <>
                                    <li className="px-2 py-1 text-sm text-gray-400 border-b border-gray-700">
                                        <span className="flex items-center">
                                            <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
                                            {walletAddress}
                                        </span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={connectWallet}
                                            className="flex items-center text-red-400 hover:bg-gray-700 py-2 px-3 rounded-md"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Desconectar Wallet
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button
                                        onClick={connectWallet}
                                        className="flex items-center text-white hover:bg-gray-700 py-2 px-3 rounded-md"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Conectar Wallet
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
