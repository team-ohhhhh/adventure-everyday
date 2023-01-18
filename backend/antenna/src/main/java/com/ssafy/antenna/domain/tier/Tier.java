package com.ssafy.antenna.domain.tier;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tier extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tierId;

    @OneToMany(mappedBy = "tier")
    private List<User> users = new ArrayList<>();
}
