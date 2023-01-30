package com.ssafy.antenna.domain.adventure;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class AdventureInProgress extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    @Column(columnDefinition = "int not null")
    private int totalPoint;
    @Column(columnDefinition = "int default 0")
    private int currentPoint;
    @Column(columnDefinition = "datetime(6) default null")
    private LocalDateTime clearTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventureId")
    private Adventure adventure;



}
