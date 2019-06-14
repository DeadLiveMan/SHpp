CREATE TABLES SCRIPTS

```
create table messages
(
  id         int unsigned auto_increment
    primary key,
  user_id    int unsigned not null,
  username   varchar(255) not null,
  message    text         not null,
  created_at text         null
);

create table users
(
  id       int unsigned auto_increment
    primary key,
  username varchar(255) not null,
  password varchar(255) not null
);
```
you found this in directory `db`