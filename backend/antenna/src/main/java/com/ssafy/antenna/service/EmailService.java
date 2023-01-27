package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.email.Email;
import com.ssafy.antenna.domain.email.dto.AuthEmailReq;
import com.ssafy.antenna.exception.not_found.CertificationSendNotFoundException;
import com.ssafy.antenna.repository.EmailRepository;
import com.ssafy.antenna.util.EmailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final EmailRepository emailRepository;

    @Transactional
    public boolean sendMail(String email) {
        try {
            EmailUtil emailUtil = new EmailUtil(javaMailSender);
            emailUtil.setTo(email);
            emailUtil.setSubject("antenna 회원가입 인증 메일입니다.");
            Random rand = new Random();
            StringBuffer key = new StringBuffer();
            for (int i = 0; i < 6; i++) {
                key.append(rand.nextInt(10));
            }
            String htmlContent = "<p> 인증번호는 [" + key + "] 입니다.<p>";
            emailUtil.setText(htmlContent, true);
            emailUtil.send();
            //기존에 이 메일로 인증번호 저장 내역이 있다면 다 삭제하자.
            emailRepository.deleteAllByEmail(email);
            //db에 저장해주자.
            emailRepository.save(Email.saveEmail(email, key.toString()));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean checkEmailAuth(AuthEmailReq authEmailReq) {
        Email email = emailRepository.findByEmail(authEmailReq.email()).orElseThrow(CertificationSendNotFoundException::new);
        return email.getAuthNumber().equals(authEmailReq.auth());
    }
}