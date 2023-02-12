package com.ssafy.antenna.domain.antenna;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.antenna.dto.DetailAntennaRes;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Antenna extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long antennaId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    @Column(columnDefinition = "int not null")
    private Long area;
    @Column(columnDefinition = "Point not null")
    private Point coordinate;
    @Column(columnDefinition = "varchar(50) not null")
    private String w3w;

    @Column(columnDefinition = "varchar(50) not null")
    private String nearestPlace;

    public DetailAntennaRes toResponse() {
        return new DetailAntennaRes(this.antennaId, this.area, this.coordinate.getX(), this.coordinate.getY(), this.w3w, this.nearestPlace);
    }
}
