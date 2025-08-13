import { Link } from 'react-router-dom';

const Home = () => {
    const featuredDestinations = [
        {
        id: 1,
        name: "Machu Picchu",
        location: "Cusco, Perú",
        price: "0.5 ETH",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
        tokens: "250/500"
        },
        {
        id: 2,
        name: "Salar de Uyuni",
        location: "Potosí, Bolivia",
        price: "0.3 ETH",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
        tokens: "180/300"
        },
        {
        id: 3,
        name: "Laguna Colorada",
        location: "Potosí, Bolivia",
        price: "0.4 ETH",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
        tokens: "95/200"
        }
    ];

    const stats = [
        { label: "Lugares Tokenizados", value: "150+", icon: "🏔️" },
        { label: "Tokens Vendidos", value: "2,500", icon: "🎫" },
        { label: "Inversores", value: "850", icon: "👥" },
        { label: "Países", value: "15", icon: "🌍" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-nature-50 to-ocean-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-secondary text-gray py-20 px-4">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Tokeniza el <span className="text-accent">Turismo</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Invierte en los destinos más increíbles del mundo a través de tokens NFT. 
                Cada token representa una participación en lugares turísticos únicos.
            </p>
            <div className="space-x-4">
                <Link 
                to="/destinos" 
                className="btn btn-accent btn-lg text-white font-semibold px-8"
                >
                Explorar Destinos
                </Link>
                <Link 
                to="/how-it-works" 
                className="btn btn-outline btn-accent btn-lg text-accent border-accent hover:bg-accent hover:text-white px-8"
                >
                Cómo Funciona
                </Link>
            </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                <div key={index} className="text-center">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Featured Destinations */}
        <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Destinos <span className="text-primary">Destacados</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Descubre los lugares más espectaculares y únicos disponibles para tokenización
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {featuredDestinations.map((destination) => (
                <div key={destination.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <figure className="relative overflow-hidden">
                    <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 badge bg-accent text-white font-semibold">
                        {destination.tokens}
                    </div>
                    </figure>
                    <div className="card-body">
                    <h3 className="card-title text-gray-800">{destination.name}</h3>
                    <p className="text-secondary font-medium mb-2">📍 {destination.location}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{destination.price}</span>
                        <button className="btn btn-primary btn-sm">
                        Tokenizar
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/destinos" className="btn btn-primary btn-wide">
                Ver Todos los Destinos
                </Link>
            </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-nature-50">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                ¿Cómo <span className="text-secondary">Funciona</span>?
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Elige tu Destino</h3>
                <p className="text-gray-600">
                    Explora nuestra colección de lugares turísticos únicos y selecciona el que más te inspire
                </p>
                </div>

                <div className="text-center">
                <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Compra Tokens</h3>
                <p className="text-gray-600">
                    Adquiere tokens NFT que representan una participación en el lugar turístico elegido
                </p>
                </div>

                <div className="text-center">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Recibe Beneficios</h3>
                <p className="text-gray-600">
                    Obtén beneficios exclusivos, descuentos y participación en las ganancias del turismo
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-secondary to-primary text-white">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
                ¿Listo para Invertir en Turismo?
            </h2>
            <p className="text-xl mb-8 opacity-90">
                Únete a la revolución del turismo descentralizado y sé parte de los destinos más increíbles del mundo
            </p>
            <div className="space-x-4">
                <Link to="/wallet-connect" className="btn btn-accent btn-lg text-white font-semibold px-8">
                Conectar Wallet
                </Link>
                <Link to="/about" className="btn btn-outline btn-accent btn-lg text-accent border-accent hover:bg-accent hover:text-white px-8">
                Saber Más
                </Link>
            </div>
            </div>
        </section>
        </div>
    );
};

export default Home;