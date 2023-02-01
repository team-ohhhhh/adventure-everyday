package com.ssafy.antenna.domain.user;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.adventure.*;
import com.ssafy.antenna.domain.antenna.Antenna;
import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.comment.SubComment;
import com.ssafy.antenna.domain.like.AdventureLike;
import com.ssafy.antenna.domain.like.CommentLike;
import com.ssafy.antenna.domain.like.PostLike;
import com.ssafy.antenna.domain.like.SubCommentLike;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.tier.Tier;
import com.ssafy.antenna.domain.user.dto.UserDetailRes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class User extends Base implements UserDetails {
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
    @Column(columnDefinition = "varchar(255) default null")
    private String photoUrl;

    @Column(columnDefinition = "varchar(255) default null")
    private String photoName;

    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
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

    public User(LocalDateTime createTime, LocalDateTime updateTime, Long userId, String email, String nickname, String password, int level, int exp, String introduce, String photoUrl, String photoName) {
        super(createTime, updateTime);
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.level = level;
        this.exp = exp;
        this.introduce = introduce;
        this.photoUrl = photoUrl;
        this.photoName = photoName;
        this.role = Role.USER;
    }

    public UserDetailRes toResponse() {
        return new UserDetailRes(this.userId, this.email, this.nickname, this.level, this.exp, this.introduce, this.photoUrl);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return String.valueOf(userId);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
