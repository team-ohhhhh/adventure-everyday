package com.ssafy.antenna.domain.adventure;

import com.ssafy.antenna.domain.Base;
import com.ssafy.antenna.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class AdventureSucceed extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long succeedId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventure_id")
    private Adventure adventure;
    @Column(columnDefinition = "boolean default false")
    private boolean selected;

    public void updateSelected(boolean selected){
        this.selected=selected;
    }

}
