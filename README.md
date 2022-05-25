# Tech Blog  

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
  

## Description

The Project allows Users to write technical blogs, which other users can then comment on

  
## Table of Contents

- [Installation](#installation-notes)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)



## Installation Notes  

  Pull from Github and maintain the folder structure.  Run npm install to ensure all of the required modules are installed.  Enter your personal database access information into the ".env.example" file and rename to ".env".  to create the database, enter mysql and from the mysql prompt type "SOURCE db/schema.sql"  Quit mysql and return to the command line interface and then seed the database using "node seeds/index.js".  Finally, start the server by typing "node server.js" at the command line - this will open a port on 3001.  You can then use the application on your localhost.  Alternativey, it can be deployed to Heroku.    


## Usage 

  The application is intuitive for users.  A User must be logged in to create a new post or to edit their existing posts.  A person visiting the site can view blog posts from others.  However, a person must be logged in to be able to leave a comment.   


## Features  

  The ability to manage comments left against your blog is a useful feature for controlling inappropriate content.  The site is designed to operate without a moderator.   


## Credits  

  Kitefin and Heroku were used for deploying the application to the Web.  Express, Sequelize, bCrypt, Handlebars are essential dependencies for the application.  Faker was used for seeding the database during testing.   


## Contributing  

  Please advise by email of any contributions you'd like to make   




## Questions
Please use email to ask any questions you may have

Github:  https://github.com/Cancer2806

Email:  frank.lavery@westnet.com.au


## License
This project is licensed under [MIT](https://opensource.org/licenses/MIT).
