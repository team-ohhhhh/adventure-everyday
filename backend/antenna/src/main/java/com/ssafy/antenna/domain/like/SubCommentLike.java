package com.ssafy.antenna.domain.like;

import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.subcomment.SubComment;
import com.ssafy.antenna.domain.user.User;
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
public class SubCommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subCommentLikeId;

    @ManyToOne
    @JoinColumn(name = "sub_comment_id")
    private SubComment subComment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
