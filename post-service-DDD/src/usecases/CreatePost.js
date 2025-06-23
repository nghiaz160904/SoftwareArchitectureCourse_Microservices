const Post = require('../domain/entities/Post');

class CreatePost {
    /**
     * @param {PostRepository} postRepo
     */
    constructor(postRepo) {
        this.postRepo = postRepo;
    }

    /**
     * @param {{ author: string, title: string, content: string }}
     * @returns {Promise<Post>}
     */
    async execute({ author, title, content }) {
        const post = new Post({ author, title, content });
        return this.postRepo.save(post);
    }
}

module.exports = CreatePost;
