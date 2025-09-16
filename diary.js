fetch('data.json')
    .then(response => response.json())
    .then(data => {
      populateDiary(data.diaryEntries);
  
    });
const diaryEntry = document.getElementById('diary-posts');
const populateDiary = (data) => {
    data.forEach(entry => {
    const post = document.createElement('article');
    post.innerHTML = `
<article class="container card p-4 mb-5 mt-5">
        <p class="text-muted">${entry.date}</p>
        <h3>${entry.title}</h3>
        <img
          src="${entry.image}"
          alt="Imagen del primer día"
          class="img-fluid mb-3 rounded"
          style="max-height: 800px;"
          />
        <p>
            ${entry.content}
        </p>
      </article>
    `;
    diaryEntry.appendChild(post);
    });
}