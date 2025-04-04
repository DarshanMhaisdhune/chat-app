CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255)
) ;

CREATE TABLE rooms(
        id SERIAL PRIMARY KEY,
        room_id VARCHAR(255) NOT NULL
);

CREATE TABLE messages(
        id SERIAL PRIMARY KEY,
        sender_id INT NOT NULL,
        room_id INT NOT NULL,
        content TEXT NOT NULL,
        time_stamp TIMESTAMP DEFAULT now(),
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);