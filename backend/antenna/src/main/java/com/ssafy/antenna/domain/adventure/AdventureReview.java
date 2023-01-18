package com.ssafy.antenna.domain.adventure;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.user.User;
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
public class AdventureReview extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventureId")
    private Adventure adventure;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    @Lob
    @Column(columnDefinition = "blob default null")
    private Byte[] photo;
    private String content;
    @Column(columnDefinition = "int not null")
    private Integer reviewRate;
}
