CREATE DATABASE local_service;

USE local_service;

CREATE TABLE users(

id INT AUTO_INCREMENT PRIMARY KEY,

fullname VARCHAR(100),

email VARCHAR(100),

username VARCHAR(50),

password VARCHAR(100)

);