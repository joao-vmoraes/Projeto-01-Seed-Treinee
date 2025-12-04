// Configuração da API
const API_URL = 'https://blog-api.seedabit.org.br/api/posts';
const API_KEY = 'group-2-os6vfzou'; // SUBSTITUA pela sua chave

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

// Exibir posts na página
function displayPosts(posts) {
    const container = document.getElementById('blog-posts');

    if (posts.length === 0) {
        container.innerHTML = '<p>Nenhum post encontrado.</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <article class="post">
            <h3>${post.title}</h3>
            <p class="meta">Por ${post.author} em ${new Date(post.createdAt).toLocaleDateString()}</p>
            <p>${post.content}</p>
        </article>
    `).join('');
}

// Event listener do formulário
document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        title: document.getElementById('title').value.trim(),
        content: document.getElementById('content').value.trim(),
        author: document.getElementById('author').value.trim()
    };

    if (formData.title && formData.content && formData.author) {
        await createPost(formData);
        e.target.reset();
    } else {
        alert('Preencha todos os campos!');
    }
});

// Carregar posts ao abrir a página
getPosts();