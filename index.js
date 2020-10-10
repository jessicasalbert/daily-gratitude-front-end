//json-server --watch db.json

//const { config } = require("chai")


const post = {
    "user": "Slabs",
    "content": "Grateful 4 u",
    "date": "August 23",
    "likes": 0
  }
document.addEventListener("DOMContentLoaded", () => {
    toggleForm()
    getPosts()
    submitHandler()
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

function renderPosts(posts) {
    posts.map( post => renderPost(post))
}

function getPosts() {
    const postsObj = fetch("http://localhost:3000/posts")
    .then( resp => resp.json() )
    .then( users => renderPosts(users))
    .catch( error => {
        console.log(error.message)
    })
}


function renderPost(post) {
    const postsDiv = document.querySelector("#posts");
    const postEl = document.createElement("div.card");
    postEl.innerHTML = `
        <div class="card-header">
            ${post.user}
        </div>
        <div class="card-body">
            <p class="card-text">${post.content}</p>
            <h5 class="card-title">${post.likes} likes</h5>
            <button class="btn btn-dark btn-sm">Like</button>
        </div>
    `
    postsDiv.append(postEl)
}

function submitHandler() {
    document.querySelector("#form").addEventListener("submit", e => {
        e.preventDefault()
        const form = e.target
        const post =  {
            user: form.user.value,
            content: form.content.value,
            likes: 0
        }
        addPost(post)
    })
}

function addPost(post) {
    const configObj = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
        body: JSON.stringify(post)
    }
    fetch("http://localhost:3000/posts", configObj)
    .then( res => res.json() )
    .then(post => renderPost(post))
    .catch(error => console.log(error.message))
}
