create table admin(
	admin_id serial primary key,
	admin_fname varchar(64) not null,
	admin_lname varchar(64) not null,
	admin_username varchar(64) not null unique,
	admin_password varchar(250) not null
);

create table patient(
	pat_id serial primary key,
	pat_fname varchar(64) not null,
	pat_lname varchar(64) not null,
	pat_mname varchar(64),
	pat_extension varchar(10),
	pat_dob date not null,
	pat_address varchar(20) not null,
	pat_email varchar(100) not null unique,
	pat_gender varchar(20) not null,
	pat_contact varchar(15) not null
);
create table service(
	serv_id serial primary key ,
	serv_name varchar(64) not null
);

CREATE TABLE appointment (
    app_id SERIAL PRIMARY KEY,
    app_date DATE NOT NULL DEFAULT NOW(),
    app_track_id TEXT NOT NULL unique,
	app_res_status varchar(20) not null default 'Pending',
	serv_id int not null references service(serv_id) on delete cascade on update cascade,
	pat_id int not null references patient(pat_id) on update cascade on delete cascade
);
create table result(
	res_id serial primary key,
	res_date date not null,
	res_file text not null,
	app_track_id TEXT references appointments(app_track_id) on delete cascade on update cascade,
	admin_id int not null references admin(admin_id) on update cascade on delete cascade
);
