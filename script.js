document.getElementById('btnCarregar').addEventListener('click', function() {
    const vitrine = document.getElementById('vitrine');
    vitrine.innerHTML = '<p>Carregando produtos...</p>';

    // 1. Instancia o objeto XHR
    const xhr = new XMLHttpRequest();

    // 2. Configura a requisição assíncrona (GET para a API Fakestore)
    // O terceiro parâmetro 'true' define que é ASSÍNCRONO
    xhr.open('GET', 'https://fakestoreapi.com/products?limit=6', true);

    // 3. Define o que acontece quando o estado da requisição muda
    xhr.onreadystatechange = function() {
        // ReadyState 4 significa que a requisição foi CONCLUÍDA
        if (xhr.readyState === 4) {
            // Status 200 significa que o servidor respondeu com SUCESSO
            if (xhr.status === 200) {
                const produtos = JSON.parse(xhr.responseText);
                renderizarVitrine(produtos);
            } else {
                vitrine.innerHTML = '<p style="color:red">Erro ao buscar dados da API.</p>';
                console.error("Erro na comunicação: Status " + xhr.status);
            }
        }
    };

    // 4. Envia a requisição de fato
    xhr.send();
});

// Função auxiliar para desenhar os produtos na tela
function renderizarVitrine(lista) {
    const vitrine = document.getElementById('vitrine');
    vitrine.innerHTML = ''; 

    lista.forEach(prod => {
        const item = `
            <div class="produto">
                <img src="${prod.image}" alt="${prod.title}">
                <h3>${prod.title.substring(0, 20)}...</h3>
                <p><strong>R$ ${prod.price.toFixed(2)}</strong></p>
            </div>
        `;
        vitrine.innerHTML += item;
    });
}
