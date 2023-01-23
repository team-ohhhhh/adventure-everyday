package com.ssafy.antenna.domain.user;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.user.dto.FollowDetailRes;
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
public class Follow extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @Column(columnDefinition = "Long not null")
    private Long followerId;

    @Column(columnDefinition = "Long not null")
    private Long followingId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followerId", referencedColumnName = "userId" ,insertable = false, updatable = false)
    private User followerUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followingId", referencedColumnName = "userId",insertable = false, updatable = false)
    private User followingUser;

    public FollowDetailRes toResponse() {
        return new FollowDetailRes(this.getFollowId(), this.followerId, this.followingId);
    }
}
