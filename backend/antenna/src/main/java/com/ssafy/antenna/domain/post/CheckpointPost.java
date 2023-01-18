package com.ssafy.antenna.domain.post;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
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
public class CheckpointPost extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkpointId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventureId")
    private Adventure adventure;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventurePlaceId")
    private AdventurePlace adventurePlace;
}
