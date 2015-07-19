function Commit(sha, message, author, options) {
    this.sha = sha || '';
    this.message = message || '';
    this.author = author || {};
}