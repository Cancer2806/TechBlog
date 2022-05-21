// Reference models
const Users = require("./Users");
const Blogs = require("./Blogs");
const Comments = require("./Comments");

// Define relationships between tables
Users.hasMany(Blogs, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blogs.belongsTo(Users, {
  foreignKey: "user_id",
});

Users.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(Users, {
  foreignKey: "user_id",
});

Blogs.hasMany(Comments, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(Blogs, {
  foreignKey: "blog_id",
});

module.exports = { Users, Blogs, Comments };
