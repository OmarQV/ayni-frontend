// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LoadingSpinner from '../components/profile/LoadingSpinner';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileCard from '../components/profile/ProfileCard';
import TabNavigation from '../components/profile/TabNavigation';
import NFTGrid from '../components/profile/NFTGrid';
import HistoryList from '../components/profile/HistoryList';
import ReservationsList from '../components/profile/ReservationsList';
import NFTModal from '../components/profile/NFTModal';
import EditProfileModal from '../components/profile/EditProfileModal';

const fakeUserData = {
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
        {
            id: 1,
            date: '2025-01-10',
            action: 'Visitó la Isla del Sol',
            location: 'Lago Titicaca',
            type: 'visita'
        },
        {
            id: 2,
            date: '2025-01-15',
            action: 'Adquirió NFT de Tiwanaku',
            location: 'Tiwanaku',
            type: 'compra'
        },
        {
            id: 3,
            date: '2025-02-20',
            action: 'Completó tour en Sajama',
            location: 'Parque Nacional Sajama',
            type: 'tour'
        },
    ],
    nfts: [
        {
            id: 101,
            title: 'Isla del Sol - Atardecer',
            issuedDate: '2025-01-10',
            imageUrl: 'https://ganasdemundo.com/wp-content/uploads/2020/04/isla-del-sol-4-scaled.jpg',
            location: 'Lago Titicaca',
            coordinates: '-16.0170, -69.1818',
            valor: '0.05 ETH',
            beneficioComunidad: '30%',
            metadata: {
                fotos: 3,
                audios: 1,
                qrVerified: true
            }
        },
        {
            id: 102,
            title: 'Tiwanaku - Puerta del Sol',
            issuedDate: '2025-01-15',
            imageUrl: 'https://ahoraelpueblo.bo/images/noticias/Cultura/2024/09/Tiwanaku-3-0224.jpg',
            location: 'Tiwanaku',
            coordinates: '-16.5547, -68.6734',
            valor: '0.08 ETH',
            beneficioComunidad: '40%',
            metadata: {
                fotos: 5,
                audios: 2,
                qrVerified: true
            }
        },
    ],
    reservas: [
        {
            id: 201,
            lugar: 'Parque Nacional Sajama',
            fecha: '2025-03-15',
            codigo: 'SAJA-789456',
            estado: 'confirmada',
            ticketHash: '0x89a4be...4582f'
        }
    ]
};

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('nfts');
    const [selectedNFT, setSelectedNFT] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    // Verificar conexión de wallet
    useEffect(() => {
        const checkWalletConnection = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setIsWalletConnected(true);
                        setWalletAddress(accounts[0].address);
                    }
                } catch (error) {
                    console.error('Error checking wallet connection:', error);
                }
            }
        };

        checkWalletConnection();
    }, []);

    // Simular carga de datos del usuario
    useEffect(() => {
        const timer = setTimeout(() => {
            setUser(fakeUserData);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleUpdateProfile = (updatedData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedData
        }));
        setShowEditModal(false);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

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
                    user={user}
                    walletAddress={walletAddress}
                    isWalletConnected={isWalletConnected}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={handleUpdateProfile}
                />
            )}

            <div className="max-w-6xl mx-auto">
                <ProfileHeader />
                
                <ProfileCard 
                    user={user}
                    walletAddress={walletAddress}
                    isWalletConnected={isWalletConnected}
                    onEditClick={() => setShowEditModal(true)}
                />

                <TabNavigation 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <div className="mb-12">
                    {activeTab === 'nfts' && (
                        <NFTGrid 
                            nfts={user.nfts}
                            onNFTClick={setSelectedNFT}
                        />
                    )}

                    {activeTab === 'historial' && (
                        <HistoryList history={user.historial} />
                    )}

                    {activeTab === 'reservas' && (
                        <ReservationsList reservations={user.reservas} />
                    )}
                </div>
            </div>
        </div>
    );
}