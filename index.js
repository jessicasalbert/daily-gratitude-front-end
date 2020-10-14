//json-server --watch db.json

//const { config } = require("chai")


const BASE_URL = "http://localhost:3000/api/v1/posts/"

document.addEventListener("DOMContentLoaded", () => {
    toggleForm()
    getPosts()
    submitHandler()
    likeHandler()
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
    const postsObj = fetch(BASE_URL)
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
        <div class="card-body" data-id=${post.id}>
            <p class="card-text">${post.content}</p>
            <h5 class="card-title"> likes</h5>
            <button class="likes btn btn-dark btn-sm">Like</button>
        </div>
        <br>
    `
    postsDiv.append(postEl)
}

function submitHandler() {
    document.querySelector("#form").addEventListener("submit", e => {
        e.preventDefault()
        const form = e.target
        const newPost =  {
            user: form.user.value,
            content: form.content.value,
            //likes: 0
        }
        addPost(newPost)
        form.reset()
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
    fetch(BASE_URL, configObj)
    .then( res => res.json() )
    .then(post => renderPost(post))
    .catch(error => console.log(error.message))
}

function likeHandler() {
    document.querySelector("#posts").addEventListener("click", e => {
        if (e.target.matches(".likes")) {
            const likeEl = e.target.previousElementSibling
            const postId = e.target.parentElement.dataset.id
            const updatedLikes = parseInt(likeEl.textContent) + 1

            const configObj = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    likes: updatedLikes
                })
            }
            fetch(BASE_URL + postId, configObj)
            .then( res => res.json() )
            .then( obj => {
                likeEl.textContent = obj.likes + " likes"})
            .catch( error => console.log(error.message))
        }
    })
}


