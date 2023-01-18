package com.ssafy.antenna.domain.badge;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Badge extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long badgeId;

    @Column(columnDefinition = "blob default null")
    private byte[] photo;

    @OneToMany(mappedBy = "badge", cascade = CascadeType.ALL)
    private List<Adventure> adventures = new ArrayList<>();
}
