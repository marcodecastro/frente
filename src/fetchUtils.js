/*  export const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers, // Preserva outros headers que podem ser passados
    };
  
    const response = await fetch(url, { ...options, headers });
  
    return response; // Certifique-se de retornar o objeto Response diretamente
  }; */
  





  /*export const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
  
    const response = await fetch(url, { ...options, headers });
  
    // Verifica se a resposta é JSON antes de chamar response.json()
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = 'Erro ao realizar a requisição';
      
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } else {
        errorMessage = await response.text();
      }
      
      throw new Error(errorMessage);
    }
  
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text(); // Retorna o texto caso não seja JSON
    }
  }; */
  
  





  export const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
  
    const response = await fetch(url, { ...options, headers });
  
    // Verifica se a resposta é JSON antes de chamar response.json()
    const contentType = response.headers.get('content-type');
    let data;
  
    if (contentType && contentType.includes('application/json')) {
      data = await response.json(); // Lê o corpo da resposta como JSON
    } else {
      data = await response.text(); // Caso o conteúdo não seja JSON, retorna o texto
    }
  
    if (!response.ok) {
      const errorMessage = data.message || 'Erro ao realizar a requisição';
      throw new Error(errorMessage);
    }
  
    return data;
  };
  
