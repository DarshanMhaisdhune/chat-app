package com.company.chat.repository;

import com.company.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m JOIN FETCH m.sender WHERE m.room.roomId = :roomId ORDER BY m.timeStamp ASC")
    List<Message> findMessagesByRoomIdOrdered(String roomId);


}
