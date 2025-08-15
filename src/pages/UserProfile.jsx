// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import ModalTokenizar from '../components/ModalTokenizar';

// --- Datos de prueba para ambos perfiles ---
const fakeTuristaData = {
    name: 'Jhamil Calixto',
    email: 'jhamil@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jhamil',
    role: 'Turista responsable',
    bio: 'Apasionado por el turismo sostenible y la preservación cultural',
    social: {
        twitter: 'https://twitter.com/jhamil',
        instagram: 'https://instagram.com/jhamil',
    },
    historial: [
        { id: 1, date: '2025-01-10', action: 'Visitó la Isla del Sol', location: 'Lago Titicaca', type: 'visita' },
        { id: 2, date: '2025-01-15', action: 'Adquirió NFT de Tiwanaku', location: 'Tiwanaku', type: 'compra' },
        { id: 3, date: '2025-02-20', action: 'Completó tour en Sajama', location: 'Parque Nacional Sajama', type: 'tour' },
    ],
    nfts: [
        { id: 101, title: 'Isla del Sol - Atardecer', issuedDate: '2025-01-10', imageUrl: 'https://ganasdemundo.com/wp-content/uploads/2020/04/isla-del-sol-4-scaled.jpg', location: 'Lago Titicaca', coordinates: '-16.0170, -69.1818', valor: '0.05 ETH', beneficioComunidad: '30%', metadata: { fotos: 3, audios: 1, qrVerified: true }},
        { id: 102, title: 'Tiwanaku - Puerta del Sol', issuedDate: '2025-01-15', imageUrl: 'https://ahoraelpueblo.bo/images/noticias/Cultura/2024/09/Tiwanaku-3-0224.jpg', location: 'Tiwanaku', coordinates: '-16.5547, -68.6734', valor: '0.08 ETH', beneficioComunidad: '40%', metadata: { fotos: 5, audios: 2, qrVerified: true }},
    ],
    reservas: [
        { id: 201, lugar: 'Parque Nacional Sajama', fecha: '2025-03-15', codigo: 'SAJA-789456', estado: 'confirmada', ticketHash: '0x89a4be...4582f' }
    ]
};

const fakeOperadorData = {
    name: 'Operadora "Ayni Tours"',
    email: 'aynitours@example.com',
    avatar: 'https://i.pravatar.cc/150?u=aynitours',
    role: 'Operador Certificado',
    bio: 'Nos especializamos en rutas turísticas sostenibles en el altiplano boliviano.',
    ventas: 45,
    rutasPublicadas: 3,
    ingresos: '15.2 ETH',
    social: {
        twitter: 'https://twitter.com/aynitours',
        instagram: 'https://instagram.com/aynitours',
    },
};

export default function UserProfile() {
    const { isConnected, userType, registerUser } = useWallet();
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('nfts');
    const [selectedNFT, setSelectedNFT] = useState(null);

    const user = userType === 'turista' ? fakeTuristaData : fakeOperadorData;

    useEffect(() => {
        // Simulación de carga de datos
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [userType]);

    // --- Lógica de renderizado condicional ---
    if (!isConnected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                        Conecta tu wallet para ver tu perfil 
                    </p>
                    <p className="mt-2 text-gray-600">
                        Haz clic en "Conectar Wallet" en el menú superior.
                    </p>
                </div>
            </div>
        );
    }

    if (!userType) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Elige tu rol en Ayni
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-md">
                        Selecciona el rol que mejor te describe para acceder a tu dashboard personalizado.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => registerUser('turista')}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Soy un Turista 🌍
                        </button>
                        <button
                            onClick={() => registerUser('operador')}
                            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        >
                            Soy un Operador/Comunidad 🏞️
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-emerald-700 font-medium">Cargando tu perfil...</p>
                </div>
            </div>
        );
    }

    // --- Renderizado del perfil de Turista ---
    if (userType === 'turista') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Modal para NFT seleccionado */}
                {selectedNFT && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>
                        <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
                             <div className="relative">
                                 <img src={selectedNFT.imageUrl} alt={selectedNFT.title} className="w-full h-64 object-cover" />
                                 <button onClick={() => setSelectedNFT(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
                                 </button>
                             </div>
                             <div className="p-6">
                                 <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedNFT.title}</h3>
                                 <div className="flex items-center text-emerald-600 mb-4">
                                     <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> </svg>
                                     <span>{selectedNFT.location}</span>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4 mb-6">
                                     <div className="bg-blue-50 p-3 rounded-lg">
                                         <p className="text-sm text-blue-600">Valor</p>
                                         <p className="font-bold text-blue-800">{selectedNFT.valor}</p>
                                     </div>
                                     <div className="bg-green-50 p-3 rounded-lg">
                                         <p className="text-sm text-green-600">Beneficio comunidad</p>
                                         <p className="font-bold text-green-800">{selectedNFT.beneficioComunidad}</p>
                                     </div>
                                 </div>
                                 <div className="mb-6">
                                     <h4 className="font-semibold text-gray-700 mb-2">Metadatos verificados</h4>
                                     <div className="flex space-x-4">
                                         <div className="flex items-center">
                                             <svg className="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /> </svg>
                                             <span>{selectedNFT.metadata.fotos} fotos</span>
                                         </div>
                                         <div className="flex items-center">
                                             <svg className="w-5 h-5 text-purple-500 mr-1" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /> </svg>
                                             <span>{selectedNFT.metadata.audios} audios</span>
                                         </div>
                                         {selectedNFT.metadata.qrVerified && (
                                             <div className="flex items-center">
                                                 <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /> </svg>
                                                 <span>QR verificado</span>
                                             </div>
                                         )}
                                     </div>
                                 </div>
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                     <p className="text-sm text-gray-600 mb-1">Coordenadas:</p>
                                     <p className="font-mono text-gray-800">{selectedNFT.coordinates}</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
                {/* Contenido principal del perfil */}
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mb-2">Mi Perfil Turístico</h1>
                        <p className="text-lg text-blue-700">Tu colección de experiencias y NFTs</p>
                    </div>
                    {/* Tarjeta de perfil */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-all duration-300 hover:shadow-2xl">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="relative group">
                                    <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </div>
                                <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                    <p className="text-blue-600 mt-1">{user.role}</p>
                                    <p className="text-gray-500 mt-2 max-w-md">{user.bio}</p>
                                    <div className="flex justify-center md:justify-start space-x-4 mt-4">
                                        {user.social.twitter && (<a href={user.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors transform hover:scale-110" title="Twitter"> <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /> </svg> </a>)}
                                        {user.social.instagram && (<a href={user.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-50 text-pink-500 hover:bg-pink-100 p-2 rounded-full transition-colors transform hover:scale-110" title="Instagram"> <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> </svg> </a>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pestañas de navegación */}
                    <div className="flex border-b border-gray-200 mb-8">
                        <button onClick={() => setActiveTab('nfts')} className={`px-6 py-3 font-medium text-sm rounded-t-lg mr-2 transition-all ${activeTab === 'nfts' ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}>Mis NFTs</button>
                        <button onClick={() => setActiveTab('historial')} className={`px-6 py-3 font-medium text-sm rounded-t-lg mr-2 transition-all ${activeTab === 'historial' ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}>Historial</button>
                        <button onClick={() => setActiveTab('reservas')} className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all ${activeTab === 'reservas' ? 'bg-emerald-600 text-white' : 'text-emerald-600 hover:bg-emerald-50'}`}>Mis Reservas</button>
                    </div>
                    {/* Contenido de las pestañas */}
                    <div className="mb-12">
                        {activeTab === 'nfts' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {user.nfts.map((nft) => (<div key={nft.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer" onClick={() => setSelectedNFT(nft)}><div className="relative h-48 overflow-hidden"><img src={nft.imageUrl} alt={nft.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-emerald-900 to-transparent opacity-70"></div><div className="absolute bottom-0 left-0 p-4"><p className="text-emerald-200">{nft.location}</p></div><div className="absolute top-0 right-0 bg-white bg-opacity-90 rounded-bl-lg px-3 py-1 text-sm font-semibold text-emerald-700">{nft.valor}</div></div><div className="p-4"><div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-500">Fecha</span><span className="text-sm font-medium text-gray-700">{nft.issuedDate}</span></div><div className="flex justify-between items-center"><span className="text-sm text-gray-500">Beneficio comunidad</span><span className="text-sm font-bold text-emerald-600">{nft.beneficioComunidad}</span></div></div></div>))}
                            </div>
                        )}
                        {activeTab === 'historial' && (
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <ul className="divide-y divide-gray-100">
                                    {user.historial.map((item) => (<li key={item.id} className="p-5 hover:bg-emerald-50 transition-colors duration-200"><div className="flex items-start"><div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${item.type === 'visita' ? 'bg-blue-100 text-blue-600' : item.type === 'compra' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>{item.type === 'visita' && (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>)}{item.type === 'compra' && (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>)}{item.type === 'tour' && (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> </svg>)}</div><div className="ml-4"><p className="text-sm font-medium text-gray-900">{item.action}</p><div className="flex items-center text-sm text-emerald-600 mt-1"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> </svg><span>{item.location}</span></div><p className="text-sm text-gray-500 mt-1">{item.date}</p></div></div></li>))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'reservas' && (
                            <div className="grid grid-cols-1 gap-6">
                                {user.reservas.map((reserva) => (<div key={reserva.id} className="bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300"><div className="flex flex-col md:flex-row md:justify-between md:items-center"><div className="mb-4 md:mb-0"><h3 className="text-xl font-bold text-gray-800">{reserva.lugar}</h3><p className="text-emerald-600 mt-1"><svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> </svg>{reserva.fecha}</p></div><div className="flex flex-col space-y-2"><div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{reserva.estado}</div><div className="bg-gray-50 p-2 rounded-lg"><p className="text-xs text-gray-500">Código:</p><p className="font-mono text-sm">{reserva.codigo}</p></div></div></div><div className="mt-4 pt-4 border-t border-gray-100"><p className="text-sm text-gray-500">Hash del ticket:</p><p className="font-mono text-sm text-gray-700 break-all">{reserva.ticketHash}</p></div></div>))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
    // --- Renderizado del perfil de Operador ---
    if (userType === 'operador') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
                {showModal && <ModalTokenizar onClose={() => setShowModal(false)} />}
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-2">Mi Dashboard de Operador</h1>
                        <p className="text-lg text-emerald-700">Gestión de rutas y seguimiento de ingresos</p>
                    </div>
                    {/* Tarjeta de perfil del operador */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-all duration-300 hover:shadow-2xl p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center">
                                <img src={user.avatar} alt="Avatar Operador" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                                <div className="ml-6">
                                    <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                    <p className="text-emerald-600 mt-1">{user.role}</p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    Crear Nueva Ruta
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <p className="text-sm text-blue-600">Ventas totales</p>
                                <p className="text-4xl font-bold text-blue-800 mt-2">{user.ventas}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <p className="text-sm text-green-600">Rutas publicadas</p>
                                <p className="text-4xl font-bold text-green-800 mt-2">{user.rutasPublicadas}</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-xl">
                                <p className="text-sm text-purple-600">Ingresos (estimado)</p>
                                <p className="text-2xl font-bold text-purple-800 mt-2">{user.ingresos}</p>
                            </div>
                        </div>
                    </div>
                    {/* Aquí puedes añadir la sección para gestionar las rutas publicadas */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Mis Rutas</h3>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                            <p className="text-gray-500">Aquí se mostrará la lista de tus rutas publicadas. (En desarrollo)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}