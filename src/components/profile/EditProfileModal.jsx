// src/components/profile/EditProfileModal.jsx
import React, { useState } from 'react';

export default function EditProfileModal({ user, walletAddress, isWalletConnected, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        bio: user.bio,
        twitter: user.social.twitter,
        instagram: user.social.instagram,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }
        
        if (!formData.avatar.trim()) {
            newErrors.avatar = 'La URL del avatar es requerida';
        } else if (!/^https?:\/\/.+\..+/.test(formData.avatar)) {
            newErrors.avatar = 'La URL del avatar no es válida';
        }
        
        if (!formData.role.trim()) {
            newErrors.role = 'El rol es requerido';
        }
        
        if (!formData.bio.trim()) {
            newErrors.bio = 'La biografía es requerida';
        }

        // Validar URLs de redes sociales si están presentes
        if (formData.twitter && !/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/.test(formData.twitter)) {
            newErrors.twitter = 'URL de Twitter no válida';
        }
        
        if (formData.instagram && !/^https?:\/\/(www\.)?instagram\.com\/.+/.test(formData.instagram)) {
            newErrors.instagram = 'URL de Instagram no válida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const updatedData = {
            name: formData.name,
            email: formData.email,
            avatar: formData.avatar,
            role: formData.role,
            bio: formData.bio,
            social: {
                twitter: formData.twitter,
                instagram: formData.instagram,
            }
        };

        onUpdate(updatedData);
    };

    const shortenAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-gray-800">Editar Perfil</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Información de Wallet */}
                    {isWalletConnected && (
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                            <div className="flex items-center mb-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="font-medium text-emerald-700">Wallet Conectada</span>
                            </div>
                            <p className="font-mono text-sm text-emerald-800">{shortenAddress(walletAddress)}</p>
                        </div>
                    )}

                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Tu nombre completo"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="tu@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Avatar URL */}
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                            URL del Avatar *
                        </label>
                        <input
                            type="url"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.avatar ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="https://ejemplo.com/mi-avatar.jpg"
                        />
                        {errors.avatar && <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>}
                        <div className="mt-2 flex justify-center">
                            <img
                                src={formData.avatar}
                                alt="Vista previa"
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/64x64?text=Avatar';
                                }}
                            />
                        </div>
                    </div>

                    {/* Rol */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                            Rol *
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.role ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="Turista responsable">Turista responsable</option>
                            <option value="Aventurero sostenible">Aventurero sostenible</option>
                            <option value="Explorador cultural">Explorador cultural</option>
                            <option value="Viajero consciente">Viajero consciente</option>
                        </select>
                        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                    </div>

                    {/* Biografía */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                            Biografía *
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                errors.bio ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Cuéntanos sobre tus intereses de viaje..."
                        />
                        {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                    </div>

                    {/* Redes Sociales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                                Twitter/X
                            </label>
                            <input
                                type="url"
                                id="twitter"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                    errors.twitter ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="https://twitter.com/tu_usuario"
                            />
                            {errors.twitter && <p className="mt-1 text-sm text-red-600">{errors.twitter}</p>}
                        </div>

                        <div>
                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                                Instagram
                            </label>
                            <input
                                type="url"
                                id="instagram"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                    errors.instagram ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="https://instagram.com/tu_usuario"
                            />
                            {errors.instagram && <p className="mt-1 text-sm text-red-600">{errors.instagram}</p>}
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Guardar Cambios</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}