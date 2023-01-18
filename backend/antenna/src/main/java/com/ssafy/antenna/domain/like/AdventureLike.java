package com.ssafy.antenna.domain.like;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdventureLike  extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adventureLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventure_id")
    private Adventure adventure;
}
