
const post = {
    "user": "Slabs",
    "content": "Grateful 4 u",
    "date": "August 23",
    "likes": 0
  }
document.addEventListener("DOMContentLoaded", () => {
    toggleForm()
    renderPost(post)
})


function toggleForm() {
    const submit = document.querySelector("#show-form")
    const form = document.querySelector("#new-post-form")
    submit.addEventListener("click", e => {
        if (submit.matches("#show-form")) {
            form.removeAttribute("hidden")
            submit.id = "hide-form"
            submit.textContent = "Hide form"
        } else if (submit.matches("#hide-form")) {
            form.hidden = true
            submit.id = "show-form"
            submit.textContent = "Add a post"
        }
    })
}

function renderPosts(data) {

}


function renderPost(post) {
    const postsDiv = document.querySelector("#posts");
    const postEl = document.createElement("div.card");
    postEl.innerHTML = `
        <h5 class="card-header">${post.user}</h5>
        <div class="card-body">
            <p class="card-text">${post.content}</p>
            <button class="btn btn-sm">Go somewhere</button>
        </div>
    `
    postsDiv.append(postEl)
}