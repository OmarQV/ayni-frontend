import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

const NavBar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Usamos el hook useWallet
    const {
        isConnected,
        account,
        balance,
        chainId, // <-- Ahora también usamos el chainId
        connectWallet,
        disconnectWallet: disconnectWalletHook,
        loading
    } = useWallet();

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
        } catch (err) {
            console.error("Error al conectar la wallet:", err);
        }
    };

    const handleDisconnectWallet = () => {
        disconnectWalletHook();
        setIsMenuOpen(false);
    };

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatBalance = (balance) => {
        if (!balance) return '0.00';
        return parseFloat(balance).toFixed(4);
    };

    // Nueva función para obtener el nombre de la red
    const getNetworkName = (id) => {
        switch (id) {
            case 5003:
                return 'Mantle Sepolia Testnet';
            case 5000:
                return 'Mantle Mainnet';
            case 1:
                return 'Ethereum Mainnet';
            default:
                return `Red Desconocida (${id})`;
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

                {/* Menu principal (desktop) - Solo 2 rutas */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/home"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${isActive("/home")
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
                                to="/Register"
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${isActive("/Register")
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
                                className={`font-medium px-4 py-2 rounded-lg transition-colors ${isActive("/profile") ? "text-white bg-accent" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Botón de Wallet - Implementación real con el hook */}
                <div className="navbar-end">
                    <div className="flex items-center relative">
                        {!isConnected ? (
                            <button
                                onClick={handleConnectWallet}
                                disabled={loading}
                                className="bg-gray-800 text-white hover:bg-gray-700 hover:text-blue-200 px-4 py-2 rounded-md transition-all duration-300 font-semibold border border-gray-600 flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs mr-2"></span>
                                        Conectando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                        Conectar Wallet
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                {/* Badge de la red */}
                                {chainId && (
                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {getNetworkName(chainId)}
                                    </span>
                                )}

                                {/* Botón principal con dirección */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="bg-gray-800 text-white hover:bg-gray-700 hover:text-blue-200 px-4 py-2 rounded-md transition-all duration-300 font-semibold border border-gray-600 flex items-center"
                                >
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 pulse-custom"></div>
                                    {formatAddress(account)}
                                    <svg
                                        className={`w-4 h-4 ml-1 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                {/* Menú desplegable */}
                                {isMenuOpen && (
                                    <div className="absolute right-0 top-12 z-50 w-56 p-2 bg-gray-800/95 backdrop-blur-md border border-gray-600/20 rounded-lg shadow-xl">
                                        {/* Saldo */}
                                        <div className="px-4 py-3 text-sm border-b border-gray-700">
                                            <p className="text-gray-400">Balance</p>
                                            <p className="font-medium text-white">{formatBalance(balance)} ETH</p>
                                        </div>

                                        {/* Opciones del menú */}
                                        <ul className="py-1">
                                            <li>
                                                <Link to="/profile" className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700/50 hover:text-blue-300 transition-colors flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                    </svg>
                                                    Mi Perfil
                                                </Link>
                                            </li>
                                            <li>
                                                <button className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700/50 hover:text-blue-300 transition-colors flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                    Configuración
                                                </button>
                                            </li>
                                            <div className="divider my-1 border-gray-700"></div>
                                            <li>
                                                <button
                                                    onClick={handleDisconnectWallet}
                                                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700/50 hover:text-red-300 transition-colors flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                                    </svg>
                                                    Desconectar
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cerrar menú al hacer clic fuera */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </nav>
    );
};

export default NavBar;