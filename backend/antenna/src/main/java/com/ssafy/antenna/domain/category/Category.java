package com.ssafy.antenna.domain.category;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.comment.Comment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(columnDefinition = "varchar(255) not null")
    private String category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Adventure> adventures = new ArrayList<>();
}
