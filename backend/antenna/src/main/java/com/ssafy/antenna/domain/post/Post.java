package com.ssafy.antenna.domain.post;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.like.PostLike;
import com.ssafy.antenna.domain.post.dto.PostDetailRes;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Post extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Column(columnDefinition = "varchar(255) not null")
    private String title;
    @Column(columnDefinition = "varchar(255) not null")
    private String content;
    @Column(columnDefinition = "Point not null")
    private Point coordinate;
    @Column(columnDefinition = "varchar(50) not null")
    private String nearestPlace;
    @Column(columnDefinition = "varchar(50) not null")
    private String w3w;
    @Column(columnDefinition = "varchar(255) default null")
    private String photoUrl;

    @Column(columnDefinition = "varchar(255) default null")
    private String photoName;
    @Column(columnDefinition = "boolean not null")
    private boolean isPublic;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostLike> postLikes = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<CheckpointPost> checkpointPosts = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<AdventurePlace> adventurePlaces = new ArrayList<>();

    public PostDetailRes toResponse() {
        return new PostDetailRes(this.postId, this.title, this.content, this.coordinate.getX(), this.coordinate.getY(), this.nearestPlace, this.w3w, this.isPublic, this.getCreateTime(), this.getPhotoUrl(), this.user.toResponse());
    }
}
