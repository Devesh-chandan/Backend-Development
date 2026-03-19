create database collegedata;

use collegedata;

create table teachers(
id int,
name varchar(50),
subject varchar(20),
salary int 

);
insert into teachers
value
(23,"ajay","math",50000),
(47,"bharat","english",60000),
(18,"chetan","chemistry",45000),
(9,"divya","physics",75000);
select * from teachers;

select name,salary
from teachers
where salary>55000;

alter table teachers
change column salary ctc int  ;
update teachers
set ctc =ctc+(25/100)*ctc;

set SQL_SAFE_UPDATES=0;

alter table teachers
add column city varchar(30) default "nagpur";

alter table teachers
drop column ctc;




