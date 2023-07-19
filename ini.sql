CREATE DATABASE availability;

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    hashed_password VARCHAR(255),
    canManage INT DEFAULT 0
);

CREATE TABLE room(
    room_id INT PRIMARY KEY,
    capacity INT
);

CREATE TABLE booking(
    c_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255),
    tab_id INT,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (tab_id) REFERENCES room(room_id) ON DELETE CASCADE
);


/*
INSERT INTO users(email, name, hashed_password) VALUES('sachin@yahoo.com', 'Sachin', 'sachin');

INSERT INTO tab (table_id, capacity) VALUES (1, 4);

INSERT INTO booking (user_email, tab_id) VALUES ('sachin@yahoo.com', 1);

SELECT * FROM tab WHERE table_id IN (SELECT tab_id FROM booking WHERE user_email = 'sachin@yahoo.com');
*/