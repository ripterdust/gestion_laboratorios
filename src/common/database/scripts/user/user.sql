create table usuarios (
    id              int not null primary key auto_increment,
    email           varchar(200),
    nombre_usuario  varchar(500),
    password        varchar(600)
);