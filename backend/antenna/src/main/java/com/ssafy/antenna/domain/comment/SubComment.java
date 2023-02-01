package com.ssafy.antenna.domain.comment;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.like.SubCommentLike;
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
public class SubComment extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subCommentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(columnDefinition = "varchar(300) not null")
    private String content;

    @OneToMany(mappedBy = "subComment", cascade = CascadeType.ALL)
    private List<SubCommentLike> subCommentLikes = new ArrayList<>();
}
