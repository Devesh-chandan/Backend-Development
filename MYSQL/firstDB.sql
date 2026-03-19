CREATE DATABASE college;
USE college;
CREATE TABLE student(
rollnumber INT,
name VARCHAR(30),
age INT
);

INSERT INTO student
VALUES
(101,"devesh",20),
(102,"dip",18),
(103,"yash",19);

SELECT * FROM student;

SHOW DATABASES;

SHOW TABLES;

CREATE DATABASE instagram;
USE instagram;

CREATE TABLE users(
username VARCHAR(30)NOT NULL,
id INT NOT NULL,
age INT,
password VARCHAR(10)NOT NULL UNIQUE,
email VARCHAR(30)NOT NULL UNIQUE,
followers INT DEFAULT 0,
following INT DEFAULT 0,
CONSTRAINT CHECK (age>=13),
PRIMARY KEY(id)
);
show tables;
select id,username,email,password,age from users;
select * from users;


INSERT INTO users
(username,id,age,password,email,followers,following)
VALUES
("Devesh",1134,19,"devesh123","dev@123",200,198),
("Dip",9873,20,"dip123","dip@55555",100,188),
("Yash",1254,21,"yash123","yash@123",20,18),
("Kartik",9978,18,"kartik123","kartik@123",20,98);

CREATE TABLE posts(
id INT PRIMARY KEY,
content VARCHAR(100),
userid INT,
FOREIGN KEY (userid) REFERENCES users(id)
);

INSERT INTO posts
VALUES
(1,"hello my name is devesh",1234),
(2,"hello my name is dip",9873),
(3,"hello my name is yash",1254),
(4,"hello my name is kartik",9978);

select * from posts;

select max(followers)
from users;

select min(followers)
from users;

select sum(followers)
from users;

select AVG(followers)
from users;

select count(followers)
from users
where followers>100;

select age, max(followers)
from users
group by age
having max(followers)>100;


set SQL_SAFE_UPDATES=0;

update users
set followers=1000
where age=20;

select * from users;

alter table users
add column location varchar(20) default "nagpur";










