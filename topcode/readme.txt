This is fullstack project of Villa booking App

as per  the requirement, its completely fullfilling the requirement
as mentioned in the -- Villa Rent VueJS Practice Challenge,

Technology used -- 
Frontend - VueJsw with (Bootstrap, momentJS,  Axios)
Backend - NodeJS (ExpressJS)
Database - MongoDB;

How to Start the Project --
First of all download the folder and type npm install one by one in both the folder

then There are two folders as you can see book-villa(Frontend), server(Backend).
you need to just start the server by just into the server folder and type `npm start` command
in the command prompt or in termianl

similiarly just start the Frontend part by just into the book-villa folder and type same `npm start` 
command in the command prompt or in termianl 

For database if is there any .env file already there then ok ,else create one .env file
and past this two following variables into it

MONGDB_URL=<your database link>
PORT=8000

then you have to create database on mongodb atlas and connect it via link by placing your 
database link in place of <your database link>
now you can kill the server and start again with npm start

now you project is ready open the below URL on browser
http://localhost:8080/
