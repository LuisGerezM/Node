const BaseRepository = require("./base.repository");

let _commentRepository = null;
let _ideaRepository = null;

class CommentRepository extends BaseRepository {
  constructor({ Comment, IdeaRepository }) {
    super(Comment);
    _commentRepository = Comment;
    _ideaRepository = IdeaRepository;
  }
}

module.exports = CommentRepository;
