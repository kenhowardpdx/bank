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
