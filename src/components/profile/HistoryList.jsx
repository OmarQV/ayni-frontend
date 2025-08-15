// src/components/profile/HistoryList.jsx
import React from 'react';

export default function HistoryList({ history }) {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'visita':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            case 'compra':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'tour':
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                );
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'visita':
                return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'compra':
                return 'bg-purple-100 text-purple-600 border-purple-200';
            case 'tour':
                return 'bg-green-100 text-green-600 border-green-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getActivityLabel = (type) => {
        switch (type) {
            case 'visita':
                return 'Visita';
            case 'compra':
                return 'Compra NFT';
            case 'tour':
                return 'Tour Completado';
            default:
                return 'Actividad';
        }
    };

    if (!history || history.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No hay actividad reciente</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Comienza a explorar lugares y completar tours para ver tu historial aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="flow-root">
  <ul className="-mb-8">
    {history.map((activity, activityIdx) => (
      <li key={activity.id}>
        <div className="relative pb-8">
          {activityIdx !== history.length - 1 ? (
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
          ) : null}
          
          <div className="relative flex space-x-4">
            <div className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${getActivityColor(activity.type)} ring-2 ring-white`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex min-w-0 flex-1 flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getActivityColor(activity.type)}`}>
                  {getActivityLabel(activity.type)}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(activity.date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <h3 className="text-sm font-medium text-gray-900">
                {activity.title}
              </h3>
              
              {activity.description && (
                <p className="text-sm text-gray-600">
                  {activity.description}
                </p>
              )}
              
              {activity.location && (
                <div className="mt-1 flex items-start text-sm text-gray-500">
                  <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{activity.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
    );
}