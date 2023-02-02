package com.ssafy.antenna.domain.category;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class Category extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    //    @Column(columnDefinition = "varchar(255) not null")
    @Column(nullable = false)
    private String category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Adventure> adventures = new ArrayList<>();
}
