import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const stats = [
        { label: "Países", value: "8+", icon: "🌎" },
        { label: "Rutas activas", value: "47", icon: "📍" },
        { label: "Viajeros", value: "3.2K", icon: "✈️" },
        { label: "MNT distribuidos", value: "890K", icon: "💰" }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            {/* Banner y Presentación del Proyecto */}
            <section className="min-h-screen w-full flex items-center justify-center px-4 py-20 bg-cover bg-center text-gray-800" style={{ backgroundImage: "url('http://googleusercontent.com/image_collection/image_retrieval/1251805359505376060_0')" }}>
                <div className="absolute inset-0 bg-white opacity-40"></div>
                <div className="relative max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">
                        <span className="text-secondary">AYNI</span> - Reciprocidad Sostenible
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-800/90 mb-8 max-w-4xl mx-auto">
                        Un ecosistema Web3 que transforma el turismo en América Latina mediante blockchain, NFTs y gamificación, creando un círculo virtuoso de desarrollo sostenible.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Link to="/destinations" className="px-6 py-3 border-2 border-secondary text-secondary font-bold rounded-lg hover:bg-secondary/10 transition shadow-lg">
                            🚀 Explora Rutas NFT
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/50 backdrop-blur-md p-4 rounded-lg border border-gray-300 shadow-md">
                                <div className="text-2xl font-bold text-primary">{stat.icon} {stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;