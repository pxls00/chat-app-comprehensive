CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  

CREATE TABLE IF NOT EXISTS user (  
  uuid uuid DEFAULT uuid_generate_v1 (),  
  email VARCHAR(255) UNIQUE NOT NULL,  
  password TEXT NOT NULL,  
  name VARCHAR(255),  
  PRIMARY KEY (uuid)  
);  

CREATE TABLE IF NOT EXISTS token(  
  uuid uuid DEFAULT uuid_generate_v1() PRIMARY KEY,  
  user_uuid uuid UNIQUE REFERENCES user(uuid),  
  refresh_token TEXT NOT NULL  
);  