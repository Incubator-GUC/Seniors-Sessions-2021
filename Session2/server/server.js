const express = require('express');
const app = express();
const cors = require('cors');
const { readFileSync, writeFileSync } = require('fs')

app.use(express.json());
app.use(cors())

app.get('/posts', async (req, res) => {
    try {
        const data = await readFileSync("./posts.json")
        const posts = JSON.parse(data)
        if (posts) {
            return res.status(200).json(posts)
        }
        return res.status(404).json({ message: "No posts found" })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }

})

app.get('/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const data = await readFileSync("./posts.json")
        const posts = JSON.parse(data)
        const post = posts.find(p => p.id === id)
        if (post)
            return res.status(200).json(post)
        else
            return res.status(404).json({ message: "No post found" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }

})

app.post('/posts', async (req, res) => {
    try {
        const data = await readFileSync("./posts.json")
        const posts = JSON.parse(data)
        const post = req.body.post
        if (!post) {
            return res.status(400).json({ message: "Bad request body" })
        }
        posts.push(post)
        const response = await writeFileSync("./posts.json", JSON.stringify(posts))
        return res.status(201).json({ post, response })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }

})

app.put('/posts/:id', async (req, res) => {

    try {
        const id = parseInt(req.params.id)
        const updatedPost = req.body.post
        const data = await readFileSync("./posts.json")
        const posts = JSON.parse(data)
        const filteredPosts = posts.filter(post => post.id !== id)
        if (updatedPost && filteredPosts.length < posts.length) {
            filteredPosts.push(updatedPost)
            const response = await writeFileSync("./posts.json", JSON.stringify(filteredPosts))
            return res.status(202).json({ updatedPost, response })
        } else if (!updatedPost) {
            return res.status(400).json({ message: "Bad request body" })
        }
        else
            return res.status(404).json({ message: "No post found" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await readFileSync("./posts.json")
        const posts = JSON.parse(data)
        const newPosts = posts.filter(post => post.id !== id)
        console.log(newPosts.length, posts.length)
        if (posts.length === newPosts.length) {
            return res.status(404).json({ message: "Post not found" })
        }
        const response = await writeFileSync("./posts.json", JSON.stringify(newPosts))
        return res.status(200).json({ message: "Deleted successfully", response })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })

    }

})

app.listen(4000, () => {
    console.log("Running on port 4000")
})