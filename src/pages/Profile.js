import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchWithToken } from '../fetchUtils';
import '../styles/Profile.css';

const Profile = () => {
    const [member, setMember] = useState(null);
    const [comemoracoes, setComemoracoes] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetching profile data
                const profileResponse = await fetchWithToken('https://detras.onrender.com/api/profile');
                //const profileResponse = await fetchWithToken('http://localhost:5000/api/profile');
                // Fetching events data separately
                const eventsResponse = await fetchWithToken('https://detras.onrender.com/api/events');
                //const eventsResponse = await fetchWithToken('http://localhost:5000/api/events');

                // Setting profile data
                if (profileResponse) {
                    setMember(profileResponse.member || {});
                    setComemoracoes(profileResponse.comemoracoes || []);
                } else {
                    throw new Error('Erro ao processar dados do perfil');
                }

                // Setting events data
                if (Array.isArray(eventsResponse)) {
                    setEvents(eventsResponse);
                } else {
                    throw new Error('Erro ao processar dados dos eventos');
                }

            } catch (err) {
                console.error('Erro ao carregar os dados do perfil ou eventos:', err);
                setError(err.message); // Display the error message in the UI
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <p className="loading">Carregando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            {member && Object.keys(member).length > 0 ? (
                <>
                    <div className="profile-header">
                        <img src="URL_DA_IMAGEM" alt={`${member.nome}`} />
                        <h1>{member.nome}</h1>
                    </div>

                    <div className="profile-info">
                        <p>Email: {member.email}</p>
                        <p>Data de Nascimento: {new Date(member.data_nascimento).toLocaleDateString()}</p>
                        <p>Celular: {member.celular}</p>
                    </div>

                    <h2><i className="fas fa-calendar-alt"></i> Comemorações</h2>
                    <ul className="comemoracoes">
                        {comemoracoes.map((comem, index) => (
                            <li key={index}>
                                <p>{comem.descricao}</p>
                            </li>
                        ))}
                    </ul>

                    <h2><i className="fas fa-calendar-alt"></i> Eventos</h2>
                    <ul className="eventos">
                        {events.map(event => (
                            <li key={event.id}>
                                <h3>{event.titulo}</h3>
                                <p>Data: {new Date(event.data).toLocaleDateString()}</p>
                                <p>Início: {event.inicio}</p>
                                <p>Término: {event.termino}</p>
                                <p>Descrição: {event.descricao}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Nenhum dado disponível para o perfil.</p>
            )}
        </div>
    );
};

export default Profile; 













































