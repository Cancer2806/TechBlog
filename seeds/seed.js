// Define required modules
const { faker } = require('@faker-js/faker');
// const { Sequelize } = require('sequelize/types');
const sequelize = require('../config/connection');
const { Users, Blogs, Comments } = require('../models');

// Function to seed Users table
async function seedUsers(num) {
  for (let i = 0; i < num; i++) {
    const userName = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password(8);

    await Users.create({
      userName,
      email,
      password,
    });
  }
};

async function seedBlogs(num) {
  for (let i = 0; i < num; i++) {
    const title = faker.lorem.sentence();
    const contents = faker.lorem.paragraphs();

    const rndUser = await Users.findAll({
      order: sequelize.literal("rand()"), limit: 1
    });
    const user_id = rndUser[0].id;

    await Blogs.create({
      title,
      contents,
      user_id,
    });
  }
};

async function seedComments(num) {
  for (let i = 0; i < num; i++) {
    const detail = faker.lorem.paragraph();

    const rndUser = await Users.findAll({
      order: sequelize.literal("rand()"), limit: 1
    });

    const rndBlog = await Blogs.findAll({
      order: sequelize.literal("rand()"), limit: 1,
    });

    const user_id = rndUser[0].id;
    const blog_id = rndBlog[0].id;

    await Comments.create({
      detail,
      user_id,
      blog_id,
    });
  }
};

async function seedDatabase() {
  // sync Sequelize with database
  sequelize.sync({ force: true }).then(async () => {
    // seed Users
    await seedUsers(10);
    // seed Blogs
    await seedBlogs(10);
    // seed Comments
    await seedComments(5);
  })
};

// call function to seed the Database
seedDatabase();