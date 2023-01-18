package com.ssafy.antenna.domain.post;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.like.PostLike;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

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
    @Column(columnDefinition = "blob default null")
    private byte[] photo;
    @Column(columnDefinition = "boolean not null")
    private boolean isPublic;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostLike> postLikes = new ArrayList<>();

}
