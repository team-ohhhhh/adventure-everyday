package com.ssafy.antenna.domain.adventure;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.post.CheckpointPost;
import com.ssafy.antenna.domain.post.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class AdventurePlace extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adventurePlaceId;

    @Column(columnDefinition = "varchar(255) not null")
    private String title;

    @Column(columnDefinition = "varchar(255) default null")
    private String content;
    @Column(columnDefinition = "Point not null")
    private Point coordinate;
    @Lob
    @Column(columnDefinition = "blob default null")
    private byte[] photo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventureId")
    private Adventure adventure;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    private Post post;

    @OneToMany(mappedBy = "adventurePlace", cascade = CascadeType.ALL)
    private List<Checkpoint> checkpoints = new ArrayList<>();

    @OneToMany(mappedBy = "adventurePlace", cascade = CascadeType.ALL)
    private List<CheckpointPost> checkpointPosts = new ArrayList<>();
}
