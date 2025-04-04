DELETE FROM messages WHERE room_id IN (SELECT id FROM rooms); -- Deletes related messages first
DELETE FROM rooms; -- Deletes all room data
