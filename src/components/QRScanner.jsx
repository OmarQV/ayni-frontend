// src/components/QRScanner.jsx
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useWallet } from '../hooks/useWallet';

export default function QRScanner({ onClose }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { mintCommemorativeNFT } = useWallet();

    const handleScan = async (result) => {
        if (result && !data) {
            setData(result.text);
            setLoading(true);
            
            try {
                // Aquí procesarías el resultado del QR
                // Ejemplo de estructura esperada: 
                // { experienceId: "123", location: "Tiwanaku", nftEligible: true }
                const qrData = JSON.parse(result.text);
                
                if (qrData.nftEligible) {
                    // Lógica para acuñar NFT
                    await mintCommemorativeNFT(qrData.experienceId);
                    alert(`NFT acuñado exitosamente para ${qrData.location}`);
                }
            } catch (err) {
                setError("Error al procesar el código QR");
                console.error(err);
            } finally {
                setLoading(false);
                onClose();
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Escanear Código QR</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-4">
                    {error ? (
                        <div className="text-red-500 text-center py-8">{error}</div>
                    ) : data ? (
                        <div className="text-center py-8">
                            <p className="text-green-600 font-medium">¡Código QR válido!</p>
                            <p className="mt-2">Procesando experiencia...</p>
                            {loading && (
                                <div className="mt-4 flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="aspect-square bg-black">
                            <QrReader
                                constraints={{ facingMode: 'environment' }}
                                onResult={handleScan}
                                scanDelay={500}
                                className="w-full h-full"
                            />
                        </div>
                    )}
                </div>
                
                <div className="p-4 bg-gray-50 text-center">
                    <p className="text-sm text-gray-600">Apunte al código QR en el sitio turístico</p>
                </div>
            </div>
        </div>
    );
}