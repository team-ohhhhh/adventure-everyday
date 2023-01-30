package com.ssafy.antenna.repository;


import com.ssafy.antenna.domain.post.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long> {

    String insertPointQuery = "UPDATE post SET coordinate = ST_GEOMFROMTEXT(:point) WHERE post_id = :postId";
    String deletePostQuery = "delete from post where post_id=:postId";
    //    String getAllPostWithAreaQuery = "SELECT * FROM post as p WHERE MBRCONTAINS(ST_LINESTRINGFROMTEXT(:stringText), p.coordinate)";
    String getAllPostWithAreaQuery = "SELECT * FROM post as p WHERE MBRCONTAINS(ST_LINESTRINGFROMTEXT('LINESTRING(:x1 :y1, :x2 :y2)'), p.coordinate)";

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = insertPointQuery)
    int setPoint(Long postId, String point);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = deletePostQuery)
    void deletePost(Long postId);

}
