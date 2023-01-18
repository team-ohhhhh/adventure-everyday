package com.ssafy.antenna.domain.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;
    @ManyToOne
    @JoinColumn(name = "follower_id", referencedColumnName = "userId")
    private User followerUser;

    @ManyToOne
    @JoinColumn(name = "following_id", referencedColumnName = "userId")
    private User followingUser;
}
