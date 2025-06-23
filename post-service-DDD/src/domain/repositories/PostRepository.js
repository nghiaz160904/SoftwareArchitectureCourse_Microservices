// Đây là interface, chỉ định contract
class PostRepository {
    /**
     * @param {Post} post
     * @returns {Promise<Post>}
     */
    async save(post) {
        throw new Error('Method not implemented.');
    }

    /**
     * @returns {Promise<Post[]>}
     */
    async findAll() {
        throw new Error('Method not implemented.');
    }
}

module.exports = PostRepository;
