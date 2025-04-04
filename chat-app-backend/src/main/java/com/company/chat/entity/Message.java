package com.company.chat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
    @Column(nullable = false)
    private String content;
    @Column(name = "time_stamp")
    private LocalDateTime timeStamp;

    public Message( Room room,User sender, String content) {
        this.sender = sender;
        this.room = room ;
        this.content = content;
        this.timeStamp = LocalDateTime.now();
    }

}
