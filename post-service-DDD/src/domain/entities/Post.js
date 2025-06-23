class Post {
    constructor({ id = null, author, title, content, createdAt = new Date() }) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}

module.exports = Post;
