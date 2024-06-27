-- creacion de DB
create database gestion_materiales;
use gestion_materiales;

-- creacion de tablas
create table materiales(
	id int not null auto_increment,
    title varchar(200) not null,
    descripcion text not null,
    -- contraint
    constraint pk_materiales primary key (id)
);
insert into materiales(title, descripcion) values('Cuaderno cuadriculado de 100 hojas', 'descripcion del cuaderno de 100 hojas');
select * from materiales;

create table rol(
	id int not null auto_increment,
    title varchar(100) not null,
    -- constraint 
    constraint pk_rol primary key (id),
    constraint chk_rol check (title in ('administrador', 'estudiante', 'repartidor'))
);
insert into rol(title) values
('administrador'),
('estudiante'),
('repartidor');
select * from rol;

create table usuarios(
	id int not null auto_increment,
    username varchar(200) not null,
    name varchar(100) not null,
    lastName varchar(100) not null,
    password varchar(255) not null,
    email varchar(200) not null,
    rol_id int not null,
    createdDate timestamp not null default current_timestamp,
    
    -- constraint
    constraint pk_usuarios primary key (id),
    constraint fk_rol foreign key (rol_id) references rol(id) on update cascade on delete cascade,
    constraint unique_email unique(email),
    constraint unique_username unique(username)
);
-- insert into usuarios(name, lastName, email, password, username, rol_id) values ('Juan', 'Vidal', 'juanvidal@gmail.com', 'juantest123', 'juanvidal03', 1);
select * from usuarios;

create table entrega(
	id int not null auto_increment,
    usuario_id  int not null,
    material_id int not null,
    state enum('entregado', 'no entregado'),
    deliver_date timestamp not null default current_timestamp,
    
    -- constraint
	constraint pk_entrega primary key(id),
    constraint fk_usuario foreign key(usuario_id) references usuarios(id) on delete cascade,
    constraint fk_material foreign key(material_id) references materiales(id) on delete cascade,
    constraint check_estado check(state in ('entregado', 'no entregado'))
);
insert into entrega (usuario_id, material_id, state) values
(1,1, 'entregado');
select * from entrega;