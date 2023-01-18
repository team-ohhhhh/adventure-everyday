package com.ssafy.antenna.domain.user;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.adventure.AdventureReview;
import com.ssafy.antenna.domain.antenna.Antenna;
import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.like.AdventureLike;
import com.ssafy.antenna.domain.like.CommentLike;
import com.ssafy.antenna.domain.like.PostLike;
import com.ssafy.antenna.domain.like.SubCommentLike;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.subcomment.SubComment;
import com.ssafy.antenna.domain.tier.Tier;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class User extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(columnDefinition = "varchar(255) not null")
    private String email;
    @Column(columnDefinition = "varchar(255) not null")
    private String nickname;
    @Column(columnDefinition = "varchar(255) not null")
    private String password;
    @Column(columnDefinition = "int default 0")
    private int level;
    @Column(columnDefinition = "int default 0")
    private int exp;
    @Column(columnDefinition = "varchar(255) default null")
    private String introduce;
    @Lob
    @Column(columnDefinition = "blob default null")
    private byte[] photo;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "tierId")
    private Tier tier;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Antenna> antennas = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SubComment> subComments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Adventure> adventures = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PostLike> postLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SubCommentLike> subCommentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "followerUser", cascade = CascadeType.ALL)
    private List<Follow> followerUsers = new ArrayList<>();

    @OneToMany(mappedBy = "followingUser", cascade = CascadeType.ALL)
    private List<Follow> followingUsers = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AdventureInProgress> adventuresInProgress = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AdventureLike> adventureLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AdventureSucceed> adventureSucceeds = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AdventureReview> adventureReviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Checkpoint> checkpoints = new ArrayList<>();
}
