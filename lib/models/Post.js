const pool = require('../utils/pool');

module.exports = class Post {
  id;
  posts;
  
  constructor(row) {
    this.id = row.id;
    this.posts = row.posts;
  
  }
    
  static async getAll() {
    const { rows } = await pool.query(
      `
          SELECT * FROM posts
          `
    ); return rows.map((row) => new Post(row));
  }
};
