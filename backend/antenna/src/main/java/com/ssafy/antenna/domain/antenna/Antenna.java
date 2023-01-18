package com.ssafy.antenna.domain.antenna;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Antenna extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long antennaId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(columnDefinition = "int not null")
    private int area;
    @Column(columnDefinition = "Point not null")
    private Point coordinate;
    @Column(columnDefinition = "varchar(50) not null")
    private String w3w;
}
