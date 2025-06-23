class PostController {
    /**
     * @param {CreatePost} createPostUseCase
     * @param {GetAllPosts} getAllPostsUseCase
     */
    constructor(createPostUseCase, getAllPostsUseCase) {
        this.createPost = this.createPost.bind(this);
        this.listPosts = this.listPosts.bind(this);
        this.createPostUseCase = createPostUseCase;
        this.getAllPostsUseCase = getAllPostsUseCase;
    }

    async createPost(req, res) {
        try {
            const { username, title, content } = req.body;
            const post = await this.createPostUseCase.execute({
                author: username,
                title,
                content,
            });
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi khi tạo bài viết' });
        }
    }

    async listPosts(_, res) {
        try {
            const posts = await this.getAllPostsUseCase.execute();
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi khi lấy danh sách bài viết' });
        }
    }
}

module.exports = PostController;
