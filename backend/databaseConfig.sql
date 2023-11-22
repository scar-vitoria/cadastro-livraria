CREATE TABLE  IF NOT EXISTS AUTOR (
    autorid bigserial constraint pk_autor PRIMARY KEY,
	codigo varchar(30) UNIQUE,
	nome varchar(50),
    descricao VARCHAR(300),
    deleted boolean DEFAULT false
);

INSERT INTO AUTOR VALUES 
    (default, 'A001', 'John Green', 'John Michael Green é um vlogger, empresário, produtor e autor norte-americano de livros para jovens.'),
    (default, 'A002', 'Árthur Conan Doyle', 'Arthur Ignatius Conan Doyle foi um escritor e médico escocês, mundialmente famoso por suas 60 histórias sobre o detetive Sherlock Holmes, consideradas uma grande inovação no campo da literatura criminal.') 
ON CONFLICT DO NOTHING;

CREATE TABLE  IF NOT EXISTS LIVROS (
    livroid bigserial constraint pk_livros PRIMARY KEY,
    codigo varchar(30) UNIQUE,
    titulo VARCHAR(60),
	paginas integer,
	ano integer,
	autorid bigint constraint fk_autor_livros REFERENCES autor,
    deleted boolean DEFAULT false
);

INSERT INTO LIVROS VALUES 
	(default, 'L001', 'A culpa é das estrelas', 288, 2012,
	 	(SELECT autorid from AUTOR where  codigo = 'A001')),
	(default, 'L002', 'Sherlock holmes - Um estudo em vermelho', 176, 1887,
		 (SELECT autorid from AUTOR where  codigo = 'A002'))
ON CONFLICT DO NOTHING;

select * from autor
select * from livros

CREATE TABLE  IF NOT EXISTS USUARIOS (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios VALUES 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;
