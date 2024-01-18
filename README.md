# Albumproject

## Description: 

I made this project to learn about django and redux-toolkit. Project frontend side was made with typescript and server with python. Project is simple site where you can put your albums so others can view them. Project has still some problems to fix, example updating more than 3 photos at time to S3 bucket and some routing fixes. I used following frameworks to create project: 

### Server: 

- [django-resframework](https://www.django-rest-framework.org/), including simple jwt for cookies
- [MySQL](https://www.mysql.com/) database
- [Railway](https://railway.app/)for hosting a database and project
  
### Express

- [S3bucket](https://s3.console.aws.amazon.com/s3/get-started?region=eu-north-1&region=eu-north-1) to store images and get the urls(image URLs are stored in MySQL also)
- [NodeJS](https://nodejs.org/en) and [Express](https://expressjs.com/) for routing between client and server
- [Multer](https://github.com/expressjs/multer) and [Sharp](https://www.npmjs.com/package/express-sharp) for image handling
  
 ### Client

- [React](https://create-react-app.dev/) create react app to setup frontend
- [Tailwind](https://tailwindcss.com/) and [Flowbite](https://www.flowbite-react.com/) for css
- [ReactRouterDom](https://reactrouter.com/en/main) for routing different pages

Project is not deployed at the moment in google cloud:  https://albumfrontend-swdfx3v3pa-lz.a.run.app/

## How to install: 
 Server:

1. Clone project from https://github.com/Juhoedvard/Albumproject.git
2. Open project in terminal and add command cd backend
3. Use command python -m venv venv and then if you use windows cd venv and Scripts/activate. If you are on linux/macOS use commadn python -m venv venv and then source venv/bin/activate
4. Go back to the Albumproject/backend folder and use command pip install -r requirements.txt to install required dependencies
5. Set up your database (whatever you want) if you are using mySQL you can simply just deploy MySQL to railway. Create new project and select Provision MySQL and from connect section you can find variables for connecting to django. Or you can just run mySQL locally https://dev.mysql.com/doc/mysql-getting-started/en/
6. When you have your database ready run python manage.py makemigrations in your terminal and after that run python manage.py migrate.
7. Now you can run your server with python manage.py runserver

 Express: 

1. Open project in terminal and add command cd frontend
2. Use command use npm install to install dependencies
3. Use command npm run dev to run express locally in development enviroment

 S3aws:

1. You can get instructions from here https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html

 Client:
1. Open project in terminal and add command cd client
2. Use command npm install to install dependencies
3. Use command npm start to start your client.

