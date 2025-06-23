class GetAllPosts {
    /**
     * @param {PostRepository} postRepo
     */
    constructor(postRepo) {
        this.postRepo = postRepo;
    }

    /**
     * @returns {Promise<Post[]>}
     */
    async execute() {
        return this.postRepo.findAll();
    }
}

module.exports = GetAllPosts;
