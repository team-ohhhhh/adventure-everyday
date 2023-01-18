package com.ssafy.antenna.domain.user;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class AdventureInProgress extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "adventureId")
    private Adventure adventure;

    @Column(columnDefinition = "int not null")
    private int totalPoint;
@Column(columnDefinition = "int default 0")
    private int currentPoint;
@Column(columnDefinition = "datetime(6) default null")
    private LocalDateTime clearTime;


}
