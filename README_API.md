# Back-End
### Métodos utilizados para funcionamento do Blog.
#### 1. Método *GET*
- Esse método é essencial, pois quando há o recarregamento ou a abertura da página, a APi traz todos os itens salvos em .json para a Landing Page, no caso, o autor, a descrição e título.
- Analogia: O GET é como se o garçom(APi) trouxesse o cardápio(GET) de um restaurante, pois ele mostra tudo que tem ali.
```
// GET - Buscar posts
async function getPosts() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('blog-posts').innerHTML =
            '<p class="error">Erro ao carregar posts.</p>';
    }
}
 ```
#### 2. Método *POST*
- Assim como o GET, o POST é muito importante, pois quando alguém preenche as entradas do blog e aperta o botão de publicar,
a APi salva as informações em formato .json e as guarda como se fosse um "Banco de Dados", deixando "de bandeja" para o método GET.
- Analogia: O POST é o pedido(POST) que a pessoa faz à um garçom(APi) no restaurante, ou seja, o cliente envia uma informação e o garçom a salva(.json).
```
// POST - Criar post
async function createPost(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const newPost = await response.json();
        alert('Post criado com sucesso!');
        
        getPosts();
        
        // Atualiza a lista
        return newPost;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar post. Tente novamente.');
    }
}
```
#### 3. Método *DELETE*
- O DELETE serve para apagar posts no blog, ou seja, quando a pessoa apertar o botão de deletar, a APi vai no "Banco de Dados" e deleta as informações salvas no escopo do .json, então, logo em seguida o site será
atualizado automáticamente, de modo que, aquele .json deletado, não será transmitido, pois ele foi apagado. Então o metodo GET não vai encontrar esse escopo deletado, de forma que essa informação apagada não será
transmitida no blog.
- Analogia: O DELETE é como se eu tivesse cancelado(DELETE) um pedido feito, ou seja, como foi dito na analogia do POST, o garçom(APi) salva essa informação, e quando o DELETE(Cancelamento do pedido) entra em ação
o garçom remove a informação salva(.json).
```
// DELETE - deletar posts
async function deletePost(postId) {

    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY,
                'accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        console.log('Post deletado com sucesso!');
        alert('Post deletado com sucesso!');

			// Atualizar a lista de posts
			getPosts();

    } catch (error) {
        console.error('Erro ao deletar post:', error);
        alert('Erro ao deletar post. Tente novamente.');
    }
}
```
