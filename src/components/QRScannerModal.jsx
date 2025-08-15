import React, { useState, useEffect} from 'react';
import { Camera, QrCode, Gift, MapPin, Star, X, CheckCircle, Loader } from 'lucide-react';

const QRScannerModal = ({ isOpen, onClose }) => {
  const [scanningMode, setScanningMode] = useState('camera'); // 'camera' or 'manual'
  const [scannedData, setScannedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mintingStatus, setMintingStatus] = useState(null); // 'success', 'error', null
  const [nftMinted, setNftMinted] = useState(null);
  const [manualCode, setManualCode] = useState('');
  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  // Simulación de datos QR para diferentes destinos de América Latina
  const mockQRData = {
    'AYNI-COL-001': {
      location: 'Hacienda Cafetera El Paraíso',
      country: 'Colombia',
      route: 'Ruta del Café en Colombia',
      coordinates: '4.5981, -75.2958',
      nft: {
        name: 'Café Colombiano NFT',
        description: 'Has visitado una auténtica hacienda cafetera en el corazón de Colombia',
        image: 'https://img.freepik.com/foto-gratis/delicioso-cafe-organico-naturaleza-muerta_23-2151762341.jpg?semt=ais_hybrid&w=740&q=80',
        rarity: 'Común',
        points: 50
      }
    },
    'AYNI-PER-002': {
      location: 'Machu Picchu',
      country: 'Perú',
      route: 'Camino Inca Ancestral',
      coordinates: '-13.1631, -72.5450',
      nft: {
        name: 'Ciudadela Inca NFT',
        description: 'Has explorado la majestuosa ciudadela de Machu Picchu',
        image: 'https://content-viajes.nationalgeographic.com.es/medio/2018/03/01/machu-picchu_5ff969ae_1280x720.jpg',
        rarity: 'Épico',
        points: 150
      }
    },
    'AYNI-BOL-003': {
      location: 'Salar de Uyuni',
      country: 'Bolivia',
      route: 'Altiplano Boliviano',
      coordinates: '-20.1338, -67.4891',
      nft: {
        name: 'Espejo del Cielo NFT',
        description: 'Has caminado sobre el espejo más grande del mundo',
        image: 'https://uploads.exoticca.com/global/destination/poi/salar-uyuni.png',
        rarity: 'Legendario',
        points: 200
      }
    },
    'AYNI-ECU-004': {
      location: 'Mercado de Otavalo',
      country: 'Ecuador',
      route: 'Tradiciones Andinas',
      coordinates: '0.2343, -78.2628',
      nft: {
        name: 'Textil Ancestral NFT',
        description: 'Has descubierto las tradiciones textiles de los pueblos andinos',
        image: 'https://pieraceresa.cl/cdn/shop/articles/textil-unsplash.jpg?v=1659477454&width=1100',
        rarity: 'Raro',
        points: 75
      }
    }
  };

  // Simulación de cámara
  useEffect(() => {
    if (isOpen && scanningMode === 'camera') {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, scanningMode]);

  const startCamera = async () => {
    try {
      // Simulación de acceso a cámara (en un entorno real usarías getUserMedia)
      setScanning(true);
      
      // Simulación de escaneo automático después de 3 segundos
      setTimeout(() => {
        const randomCodes = Object.keys(mockQRData);
        const randomCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
        simulateQRDetection(randomCode);
      }, 3000);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    setScanning(false);
  };

  const simulateQRDetection = (qrCode) => {
    setScanning(false);
    processQRCode(qrCode);
  };

  const processQRCode = async (qrCode) => {
    setIsProcessing(true);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (mockQRData[qrCode]) {
      setScannedData(mockQRData[qrCode]);
      
      // Simular minteo de NFT
      setTimeout(() => {
        mintNFT(mockQRData[qrCode]);
      }, 2000);
    } else {
      setMintingStatus('error');
      setIsProcessing(false);
    }
  };

  const mintNFT = async (locationData) => {
    try {
      // Simulación de minteo en Mantle L2
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mintedNFT = {
        tokenId: Math.floor(Math.random() * 10000),
        transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        gasUsed: '0.00012 MNT', // Costos bajos en Mantle
        blockNumber: Math.floor(Math.random() * 1000000),
        ...locationData.nft
      };
      
      setNftMinted(mintedNFT);
      setMintingStatus('success');
      setIsProcessing(false);
    } catch {
      setMintingStatus('error');
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      processQRCode(manualCode.trim());
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setNftMinted(null);
    setMintingStatus(null);
    setManualCode('');
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Escanear QR</h2>
              <p className="text-sm text-gray-600">Travel-to-Earn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!scannedData && !isProcessing && (
            <>
              {/* Mode Selector */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setScanningMode('camera')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    scanningMode === 'camera'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  <Camera className="w-4 h-4 inline mr-2" />
                  Cámara
                </button>
                <button
                  onClick={() => setScanningMode('manual')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    scanningMode === 'manual'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  <QrCode className="w-4 h-4 inline mr-2" />
                  Manual
                </button>
              </div>

              {/* Camera Mode */}
              {scanningMode === 'camera' && (
                <div className="text-center">
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4">
                    <div className="aspect-square flex items-center justify-center">
                      {scanning ? (
                        <div className="flex flex-col items-center text-white">
                          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p>Buscando código QR...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-white">
                          <Camera className="w-16 h-16 mb-4" />
                          <p>Simulación de cámara</p>
                        </div>
                      )}
                    </div>
                    
                    {/* QR Frame Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-white rounded-xl relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-orange-400 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-orange-400 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-orange-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-orange-400 rounded-br-xl"></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Apunta tu cámara hacia el código QR en el punto de interés
                  </p>
                  
                  {!scanning && (
                    <button
                      onClick={startCamera}
                      className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
                    >
                      Iniciar Escaneo
                    </button>
                  )}
                </div>
              )}

              {/* Manual Mode */}
              {scanningMode === 'manual' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código QR Manual
                    </label>
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Ej: AYNI-COL-001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Códigos de Prueba:</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><code>AYNI-COL-001</code> - Hacienda Cafetera (Colombia)</p>
                      <p><code>AYNI-PER-002</code> - Machu Picchu (Perú)</p>
                      <p><code>AYNI-BOL-003</code> - Salar de Uyuni (Bolivia)</p>
                      <p><code>AYNI-ECU-004</code> - Mercado Otavalo (Ecuador)</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualCode.trim()}
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                  >
                    Procesar Código
                  </button>
                </div>
              )}
            </>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader className="w-8 h-8 text-white animate-spin" />
              </div>
              
              {!nftMinted ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verificando ubicación...
                  </h3>
                  <p className="text-gray-600">
                    Confirmando tu visita al destino
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Minteando tu NFT...
                  </h3>
                  <p className="text-gray-600">
                    Creando tu recuerdo digital en Mantle L2
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {mintingStatus === 'success' && nftMinted && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¡NFT Minteado con Éxito!
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <img
                  src={nftMinted.image}
                  alt={nftMinted.name}
                  className="w-32 h-32 mx-auto rounded-xl mb-4"
                />
                
                <h4 className="font-bold text-gray-900 mb-1">{nftMinted.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{nftMinted.description}</p>
                
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{scannedData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{nftMinted.rarity}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <h5 className="font-medium text-green-900 mb-2">Detalles de la Transacción</h5>
                <div className="text-sm text-green-800 space-y-1">
                  <p><strong>Token ID:</strong> #{nftMinted.tokenId}</p>
                  <p><strong>Gas usado:</strong> {nftMinted.gasUsed}</p>
                  <p><strong>Red:</strong> Mantle L2</p>
                  <p><strong>Puntos ganados:</strong> +{nftMinted.points}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={resetScanner}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Escanear Otro
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
                >
                  Ver en Perfil
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {mintingStatus === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error al procesar QR
              </h3>
              <p className="text-gray-600 mb-4">
                El código QR no es válido o ya fue usado
              </p>
              
              <button
                onClick={resetScanner}
                className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow"
              >
                Intentar de Nuevo
              </button>
            </div>
          )}
        </div>

        {/* Info Footer */}
        {!isProcessing && mintingStatus !== 'success' && (
          <div className="px-6 pb-6">
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900 mb-1">
                    Principio Ayni - Reciprocidad
                  </h4>
                  <p className="text-sm text-orange-800">
                    Al escanear este QR, contribuyes directamente a la comunidad local 
                    y recibes un NFT único como recuerdo de tu experiencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerModal;