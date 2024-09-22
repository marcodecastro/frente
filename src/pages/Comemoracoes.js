import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Card, CardContent, List } from '@mui/material';
import withAdminProtection from '../withAdminProtection';
//import '../styles/Comemoracoes.css';

const Comemoracoes = () => {
    const [comemoracoesHoje, setComemoracoesHoje] = useState([]);
    const [comemoracoesSemana, setComemoracoesSemana] = useState([]);
    const [loadingHoje, setLoadingHoje] = useState(true);
    const [loadingSemana, setLoadingSemana] = useState(true);
    const [errorHoje, setErrorHoje] = useState(null);
    const [errorSemana, setErrorSemana] = useState(null);
    const [comemoracoesBrasil, setComemoracoesBrasil] = useState([]);
    const [loadingBrasil, setLoadingBrasil] = useState(true);
    const [errorBrasil, setErrorBrasil] = useState(null);

    useEffect(() => {
        const fetchComemoracoesHoje = async () => {
            try {
                //const response = await fetch('http://localhost:5000/api/comemoracoes/comemoracoes');
                const response = await fetch('http://localhost:5000/api/comemoracoes/comemoracoes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComemoracoesHoje(data);
            } catch (error) {
                console.error('Erro ao buscar comemorações de hoje:', error);
                setErrorHoje('Erro ao carregar comemorações de hoje');
            } finally {
                setLoadingHoje(false);
            }
        };

        const fetchComemoracoesSemana = async () => {
            try {
                //const response = await fetch('http://localhost:5000/api/comemoracoes-semana/comemoracoes-semana');
                const response = await fetch('http://localhost:5000/api/comemoracoes-semana/comemoracoes-semana');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Dados recebidos:', data); // Adicione este log para verificar os dados
                setComemoracoesSemana(data);
            } catch (error) {
                console.error('Erro ao buscar comemorações da semana:', error);
                setErrorSemana('Erro ao carregar comemorações da semana');
            } finally {
                setLoadingSemana(false);
            }
        };

        const fetchComemoracoesBrasil = async () => {
            try {
                //const response = await fetch('http://localhost:5000/api/comemoracoes-brasil/comemoracoes-brasil');
                const response = await fetch('http://localhost:5000/api/comemoracoes-brasil/comemoracoes-brasil');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                //console.log('Dados recebidos:', data); // Log para verificar os dados recebidos
                setComemoracoesBrasil(data);
            } catch (error) {
                console.error('Erro ao buscar comemorações do Brasil:', error);
                setErrorBrasil('Erro ao carregar comemorações do Brasil');
            } finally {
                setLoadingBrasil(false);
            }
        };

        fetchComemoracoesHoje();
        fetchComemoracoesSemana();
        fetchComemoracoesBrasil();
    }, []);

    if (loadingHoje || loadingSemana || loadingBrasil) {    
        return <CircularProgress />;
    }

    if (errorHoje) {
        return <Typography color="error">{errorHoje}</Typography>;
    }

    if (errorSemana) {
        return <Typography color="error">{errorSemana}</Typography>;
    }

    if (errorBrasil) {
        return <Typography color="error">{errorBrasil}</Typography>;
    }

    return (
        <Container>
            
            <Typography variant="h4" gutterBottom>Comemorações de Hoje</Typography>
            <List>
                {comemoracoesHoje.map((comemoracao, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">{comemoracao.detalhes_completos}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>

            <Typography variant="h4" gutterBottom>Comemorações da Semana</Typography>
                <List>
                    {comemoracoesSemana.map((comemoracao, index) => (
                        <Card key={index} style={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography variant="h6">{comemoracao.detalhes_completos}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </List>

            <Typography variant="h4" gutterBottom>Comemorações do Brasil</Typography>
            <List>
                {comemoracoesBrasil.map((comemoracao, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">{comemoracao.nome}</Typography>
                            <Typography>{comemoracao.data_comemorativa}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Container>
    );
};

export default withAdminProtection(Comemoracoes); 







