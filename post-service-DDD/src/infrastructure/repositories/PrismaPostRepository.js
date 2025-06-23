const PostRepository = require('../../domain/repositories/PostRepository');
const Post = require('../../domain/entities/Post');
const prisma = require('../prisma/client');

class PrismaPostRepository extends PostRepository {
    async save(post) {
        const row = await prisma.post.create({
            data: {
                author: post.author,
                title: post.title,
                content: post.content,
            },
        });
        return new Post(row);
    }

    async findAll() {
        const rows = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return rows.map(r => new Post(r));
    }
}

module.exports = PrismaPostRepository;
