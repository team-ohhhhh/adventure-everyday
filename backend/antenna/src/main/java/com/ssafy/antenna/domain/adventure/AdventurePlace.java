package com.ssafy.antenna.domain.adventure;

import com.ssafy.antenna.domain.category.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class AdventurePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adventurePlaceId;

    @ManyToOne
    @JoinColumn(name = "adventureId")
    private Adventure adventure;

    @Column(columnDefinition = "Point not null")
    private Point coordinate;

    @Column(columnDefinition = "varchar(255) not null")
    private String title;

    @Column(columnDefinition = "varchar(255) default null")
    private String content;

}
