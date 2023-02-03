package com.ssafy.antenna.domain.email;

import com.ssafy.antenna.domain.Base;
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
public class Email extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emailId;

    @Column(columnDefinition = "varchar(255) not null")
    private String email;

    @Column(columnDefinition = "varchar(255) not null")
    private String authNumber;

    static public Email saveEmail(String email, String authNumber) {
        Email emails = new Email();
        emails.setEmail(email);
        emails.setAuthNumber(authNumber);
        return emails;
    }

}
