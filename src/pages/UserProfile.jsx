
import React, { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import ModalTokenizar from '../components/ModalTokenizar';
import LoadingSpinner from '../components/profile/LoadingSpinner';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileCard from '../components/profile/ProfileCard';
import TabNavigation from '../components/profile/TabNavigation';
import NFTGrid from '../components/profile/NFTGrid';
import HistoryList from '../components/profile/HistoryList';
import ReservationsList from '../components/profile/ReservationsList';
<<<<<<< HEAD
=======
import NFTModal from '../components/profile/NFTModal';
import EditProfileModal from '../components/profile/EditProfileModal';
import ProgressList from '../components/profile/ProgressList';
>>>>>>> b1bbee951a04ab9dea992b2abd7ce1757643510a


const initialTuristaData = {
    name: 'Jose Fernandez',
    email: 'jose@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=jhamil',
    role: 'Turista responsable',
    bio: 'Apasionado por el turismo sostenible y la preservación cultural',
    social: {
        twitter: 'https://twitter.com/jose',
        instagram: 'https://instagram.com/jose',
    },
    historial: [
        { id: 1, date: '2025-01-10', action: 'Visitó la Isla del Sol', location: 'Lago Titicaca', type: 'visita' },
        { id: 2, date: '2025-01-15', action: 'Adquirió NFT de Tiwanaku', location: 'Tiwanaku', type: 'compra' },
        { id: 3, date: '2025-02-20', action: 'Completó tour en Sajama', location: 'Parque Nacional Sajama', type: 'tour' },
    ],
    nfts: [
        { id: 101, title: 'Isla del Sol - Atardecer', issuedDate: '2025-01-10', imageUrl: 'https://ganasdemundo.com/wp-content/uploads/2020/04/isla-del-sol-4-scaled.jpg', location: 'Lago Titicaca', coordinates: '-16.0170, -69.1818', valor: '0.05 ETH', beneficioComunidad: '30%', metadata: { fotos: 3, audios: 1, qrVerified: true } },
        { id: 102, title: 'Tiwanaku - Puerta del Sol', issuedDate: '2025-01-15', imageUrl: 'https://ahoraelpueblo.bo/images/noticias/Cultura/2024/09/Tiwanaku-3-0224.jpg', location: 'Tiwanaku', coordinates: '-16.5547, -68.6734', valor: '0.08 ETH', beneficioComunidad: '40%', metadata: { fotos: 5, audios: 2, qrVerified: true } },
    ],
    reservas: [
        { id: 201, lugar: 'Parque Nacional Sajama', fecha: '2025-03-15', codigo: 'SAJA-789456', estado: 'confirmada', ticketHash: '0x89a4be...4582f' }
    ]
};

const initialOperadorData = {
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


<<<<<<< HEAD
const CertificationSection = ({ userAddress, userData }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Certificaciones Blockchain</h3>
                <p className="text-gray-600">Verificación descentralizada de turistas responsables</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">✅ Turista Certificado</h4>
                    <p className="text-gray-600 mb-4">{userData.name}</p>

                    <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-500 mb-1">Dirección de Wallet</p>
                        <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                            {userAddress}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                            <p className="font-semibold text-green-600">Estado</p>
                            <p className="text-gray-700">Verificado</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-blue-600">Tipo</p>
                            <p className="text-gray-700">Turista</p>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700">
                            🔗 Tu certificación está registrada en blockchain y es públicamente verificable
                        </p>
                        <button
                            onClick={() => {
                                const generatePDF = () => {
                                    const content = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .certificate { border: 3px solid #2563eb; padding: 40px; text-align: center; }
                        .header { color: #2563eb; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
                        .title { color: #059669; font-size: 32px; font-weight: bold; margin: 30px 0; }
                        .content { font-size: 16px; line-height: 1.6; margin: 20px 0; }
                        .wallet { font-family: monospace; background: #f3f4f6; padding: 10px; border-radius: 5px; word-break: break-all; }
                        .footer { margin-top: 40px; font-size: 14px; color: #6b7280; }
                        .verified { color: #059669; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="certificate">
                        <div class="header">PLATAFORMA AYNI - TURISMO SOSTENIBLE</div>
                        <div class="title">CERTIFICADO DE TURISTA RESPONSABLE</div>
                        
                        <div class="content">
                            <p><strong>Nombre:</strong> ${userData.name}</p>
                            <p><strong>Email:</strong> ${userData.email}</p>
                            <p><strong>Rol:</strong> ${userData.description || userData.role}</p>
                            <p><strong>Estado:</strong> <span class="verified">✅ Verificado</span></p>
                        </div>
                        
                        <div class="content">
                            <p><strong>Dirección de Wallet:</strong></p>
                            <div class="wallet">${userAddress}</div>
                        </div>
                        
                        <div class="content">
                            <p>Este certificado verifica que el portador ha sido registrado como 
                            <strong>Turista Responsable</strong> en la plataforma Ayni, comprometido 
                            con el turismo sostenible y la preservación cultural.</p>
                        </div>
                        
                        <div class="footer">
                            <p><strong>Fecha de emisión:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
                            <p><strong>Verificado en Blockchain:</strong> <span class="verified">Sí</span></p>
                            <p><strong>Hash de verificación:</strong> ${userAddress.slice(0, 16)}...</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

                                    const printWindow = window.open('', '_blank');
                                    printWindow.document.write(content);
                                    printWindow.document.close();

                                    printWindow.onload = () => {
                                        printWindow.focus();
                                        printWindow.print();

                                        setTimeout(() => {
                                            printWindow.close();
                                        }, 1000);
                                    };
                                };

                                generatePDF();
                            }}
                            className="w-full mt-4 bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                            </svg>
                            📄 Descargar Certificado PDF
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};


const NFTModal = ({ nft, onClose }) => {
    if (!nft) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{nft.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <img src={nft.imageUrl} alt={nft.title} className="w-full h-48 object-cover rounded mb-4" />
                <div className="space-y-2">
                    <p><strong>Ubicación:</strong> {nft.location}</p>
                    <p><strong>Valor:</strong> {nft.valor}</p>
                    <p><strong>Beneficio comunidad:</strong> {nft.beneficioComunidad}</p>
                    <p><strong>Fecha:</strong> {nft.issuedDate}</p>
                </div>
            </div>
        </div>
    );
};

const EditProfileModal = ({ user, walletAddress, isWalletConnected, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        email: user?.email || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Editar Perfil</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Biografía</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 h-20 focus:outline-none focus:border-blue-500"
                            placeholder="Cuéntanos sobre ti..."
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

=======
>>>>>>> b1bbee951a04ab9dea992b2abd7ce1757643510a
export default function UserProfile() {
    const {
        isConnected,
        account: walletAddress,
        userType,
        registerUser,
        connectWallet,
        loading: walletLoading
    } = useWallet();

    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('nfts');
    const [selectedNFT, setSelectedNFT] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState(null);


    const progressData = [
        {
            id: 1,
            etapa: "Lanzamiento MVP",
            descripcion: "Publicación de la primera versión en Mantle L2",
            fecha: "2025-08-10",
            estado: "completado",
            evidenciaHash: "ipfs://Qm123abc456def"
        },
        {
            id: 2,
            etapa: "Integración con comunidades",
            descripcion: "Registro de las primeras 5 rutas turísticas",
            fecha: "2025-08-20",
            estado: "en_progreso"
        }
    ];

    // Inicializar datos del usuario basado en el tipo
    useEffect(() => {
        if (userType) {
            setUserData(userType === 'turista'
                ? { ...initialTuristaData }
                : { ...initialOperadorData });

            // Simulación de carga de datos
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [userType]);

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
        } catch (err) {
            console.error("Error al conectar la wallet:", err);
        }
    };

    const handleUpdateProfile = (updatedData) => {
        setUserData(prev => ({
            ...prev,
            ...updatedData
        }));
        setShowEditModal(false);
    };

    //
    const renderOperatorTabContent = () => {
        switch (activeTab) {
            case 'nfts':
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">NFTs de Rutas</h3>
                        <p className="text-gray-500">Aquí se mostrarán los NFTs de tus rutas tokenizadas.</p>
                    </div>
                );
            case 'historial':
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Ventas</h3>
                        <p className="text-gray-500">Historial de ventas y transacciones de tus rutas.</p>
                    </div>
                );
            case 'reservas':
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Reservas Recibidas</h3>
                        <p className="text-gray-500">Reservas realizadas por turistas en tus rutas.</p>
                    </div>
                );
            case 'certificados':
                return (
                    <CertificationSection
                        userAddress={walletAddress}
                        userData={{
                            name: userData.name,
                            email: userData.email,
                            role: userData.role,
                            description: userData.bio
                        }}
                    />
                );
            default:
                return (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">NFTs de Rutas</h3>
                        <p className="text-gray-500">Aquí se mostrarán los NFTs de tus rutas tokenizadas.</p>
                    </div>
                );
        }
    };

    // --- Lógica de renderizado condicional ---
    if (!isConnected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                        Conecta tu wallet para ver tu perfil
                    </p>
                    <button
                        onClick={handleConnectWallet}
                        disabled={walletLoading}
                        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        {walletLoading ? 'Conectando...' : 'Conectar Wallet'}
                    </button>
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

    if (isLoading || !userData) {
        return <LoadingSpinner />;
    }

    // --- Renderizado del perfil de Turista ---
    if (userType === 'turista') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
                {/* Modales */}
                {selectedNFT && (
                    <NFTModal
                        nft={selectedNFT}
                        onClose={() => setSelectedNFT(null)}
                    />
                )}

                {showEditModal && (
                    <EditProfileModal
                        user={userData}
                        walletAddress={walletAddress}
                        isWalletConnected={isConnected}
                        onClose={() => setShowEditModal(false)}
                        onUpdate={handleUpdateProfile}
                    />
                )}

                <div className="max-w-6xl mx-auto">
                    <ProfileHeader />

                    <ProfileCard
                        user={userData}
                        walletAddress={walletAddress}
                        isWalletConnected={isConnected}
                        onEditClick={() => setShowEditModal(true)}
                    />

                    <TabNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="mb-12">
                        {activeTab === 'nfts' && (
                            <NFTGrid
                                nfts={userData.nfts}
                                onNFTClick={setSelectedNFT}
                            />
                        )}

                        {activeTab === 'historial' && (
                            <HistoryList history={userData.historial} />
                        )}

                        {activeTab === 'reservas' && (
                            <ReservationsList reservations={userData.reservas} />
                        )}

<<<<<<< HEAD
                        {activeTab === 'certificados' && (
                            <CertificationSection
                                userAddress={walletAddress}
                                userData={{
                                    name: userData.name,
                                    email: userData.email,
                                    role: userData.role,
                                    description: userData.bio
                                }}
                            />
=======
                        {activeTab === 'progreso' && (
                            <div>
                                {/* <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                                {activeTab === 'nfts' && <NFTGrid nfts={[]} />}
                                {activeTab === 'historial' && <div>Contenido historial</div>}
                                {activeTab === 'reservas' && <ReservationsList reservations={[]} />}
                                {activeTab === 'progreso' && <ProgressList progress={progressData} />}
                            </div>
>>>>>>> b1bbee951a04ab9dea992b2abd7ce1757643510a
                        )}
                    </div>
                </div>
            </div>
        );
    }

<<<<<<< HEAD
=======
    // --- Renderizado del perfil de Operador ---
>>>>>>> b1bbee951a04ab9dea992b2abd7ce1757643510a
    if (userType === 'operador') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
                {showModal && <ModalTokenizar onClose={() => setShowModal(false)} />}

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-2">
                            Mi Dashboard de Operador
                        </h1>
                        <p className="text-lg text-emerald-700">Gestión de rutas y seguimiento de ingresos</p>
                    </div>

                    {/* Tarjeta de perfil del operador */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transition-all duration-300 hover:shadow-2xl p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={userData.avatar}
                                    alt="Avatar Operador"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div className="ml-6">
                                    <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
                                    <p className="text-gray-600">{userData.email}</p>
                                    <p className="text-emerald-600 mt-1">{userData.role}</p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path>
                                    </svg>
                                    Crear Nueva Ruta
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <p className="text-sm text-blue-600">Ventas totales</p>
                                <p className="text-4xl font-bold text-blue-800 mt-2">{userData.ventas}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <p className="text-sm text-green-600">Rutas publicadas</p>
                                <p className="text-4xl font-bold text-green-800 mt-2">{userData.rutasPublicadas}</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-xl">
                                <p className="text-sm text-purple-600">Ingresos (estimado)</p>
                                <p className="text-2xl font-bold text-purple-800 mt-2">{userData.ingresos}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navegación de tabs del operador */}
                    <TabNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    {/* Contenido de las tabs del operador */}
                    <div className="mb-12">
                        {renderOperatorTabContent()}
                    </div>

                    {/* Sección de rutas */}
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