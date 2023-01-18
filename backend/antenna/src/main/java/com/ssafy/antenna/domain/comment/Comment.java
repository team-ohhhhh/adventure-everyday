package com.ssafy.antenna.domain.comment;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.like.CommentLike;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.subcomment.SubComment;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(columnDefinition = "varchar(300) not null")
    private String content;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<SubComment> subComments = new ArrayList<>();

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

}
