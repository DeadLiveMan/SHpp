create table users
(
    id       int unsigned auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(255) not null
);

create table messages
(
    id         int unsigned auto_increment
        primary key,
    username   varchar(255) not null,
    message    text         not null,
    created_at text         null
);