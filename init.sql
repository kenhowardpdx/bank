-- create users table
CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- add a user
INSERT INTO users (name, password)
  VALUES ('frank', '');

create table bill_frequencies(
	name text primary key,
	description text not null
);

create table bills (
	id BIGSERIAL primary key,
	user_id BIGINT references users(id),
	name text not null,
	start_date date not null,
	end_date date,
	amount money not null,
	bill_frequency TEXT references bill_frequencies(name)
);
