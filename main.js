const API_URL = 'https://blog-api.seedabit.org.br/api/posts';
const API_KEY = 'group-2-os6vfzou';

async function getPosts() {
    const container = document.getElementById('blog-posts');
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);

        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Erro:', error);
        container.innerHTML = '<p class="error">Erro ao carregar posts. Verifique a conexão com a API.</p>';
    }
}

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

        if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);

        
        alert('Post criado com sucesso!');

        getPosts();

    
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar post. Tente novamente.');
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        alert('Post excluído com sucesso!');
        getPosts(); 
    } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir post. Tente novamente.');
    }
}

function displayPosts(posts) {
    const container = document.getElementById('blog-posts');

    if (posts.length === 0) {
        container.innerHTML = '<p>Nenhum post encontrado.</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <article class="post-card">
            <div class="post-header">
                <h4>${post.title}</h4>
                <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p class="post-author">Por: <strong>${post.author}</strong></p>
            <p class="post-content">${post.content}</p>
            <button class="btn-delete" onclick="deletePost('${post.id}')">Excluir</button>
        </article>
    `).join('');
}

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
getPosts();