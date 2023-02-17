## 개발 환경

- 형상 관리 : GitLab
- 이슈 관리 : Jira
- Communication :
    - Mattermost
    - Webex
    - Notion
- API 문서화
    - Postman
- OS : Windows 10
- UI/UX : Figma
- IDE :
    - Vidual Studio Code 1.75
    - Intellij IDEA 2022.3.1
- DB : MySQL 8.0.30
- Server : AWS EC2
    - Ubuntu 20.04.5 LTS
    - Docker 23.0.0
    - Docker Compose 2.15.1
- WAS : Apache Tomcat 10.1.4
- Web Server : NGINX 1.22.1
- FE
    - Node.js 18.13.0
    - React 18.2.0
        - Redux Toolkit 1.9.1
        - Redux 8.0.5
- BE
    - OpenJDK 17.0.1(Zulu 17.38)
    - Spring Boot Gradle(Kotlin) 3.0.1
        - Spring Data JPA
        - Spring Security
        - Lombok

## EC2

1. Docker 23.0.0 설치
2. Docker Compose 2.15.1 설치
3. git clone
    
    ```bash
    git clone https://lab.ssafy.com/s08-webmobile2-sub2/S08P12A305.git
    ```
    
4. /S08P12A305/frontend/conf/nginx.conf → 도메인 수정
5. docker-compose up
    
    ```bash
    sudo docker compose up -d --build
    ```
    

## 외부 서비스 문서

### Kakao

[Kakao Developers](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)

### AWS S3

[클라우드 스토리지 | 웹 스토리지| Amazon Web Services](https://aws.amazon.com/ko/s3/?did=ap_card&trk=ap_card)

### what3words

[API Reference Docs | what3words](https://developer.what3words.com/public-api/docs)

## DB dump
[DB dump](./antennadb_dump.sql)

## 시연 시나리오
    1. **맵화면**
    2. **주변 확인하기 버튼 누르기**
    3. **맵 클릭을 통해서 UFO 띄우기**
    4. **그곳에 안테나를 설치 하기**
    5. **안테나 목록을 열고 미리 멀티캠퍼스에 설치한 안테나로 이동하기 + 확대해서 여러 게시글 맵마커 보이기**
    6. **글 작성 버튼 누르기**이번에는 사진을 올리는 방식으로 작성해보겠습니다.
    7. **미리 찍은 사진 올리기 (싸피에서 찍은 사진**)
    8. **제목과 내용 적기**
    9. **이후 내 프로필에 작성된 글을 찾아 들어가기**
    10. **내 프로필의 내가 만든 탐험 탭 들어가기**
    11. **탐험 만들기 들어가기**
    12. **미리 준비한 게시글 + 방금 올린 게시글로 체크포인트 채우기**맛집 등 체크포인트로서의 의미도 작성해서 사람들이 이 탐험에 몰입할 수 있도록 합니다.
    13. **다음으로 넘어가서 만들어진 지도를 확인하고 타이틀과 내용 쓰기**
    14. **다음으로 넘어가서 칭호 적어주기**
    15. **탐험 완성하고 내가 만든 탐험 탭에서 방금 만든 탐험 상세 페이지 보기 + 지도 핀 하나 눌러보기**
    16. **탐험 탭 들어가기**
    17. **탐험 하나(새로운 것 중 하나) 들어가서 모험하기 누르기**
    18. **다시 나가서 프로필의 진행중인 탭으로 가서 미리 준비한 완료용 탐험 들어가기**
    19. **탐험의 마지막 체크포인트 누르기 + 달린 글들 가볍게 보기 + 달성하는 영상 틀기**
    20. **글쓰기 버튼 누르기 + 사진찍기**
    21. **글내용 작성하기**
    22. **글 내용을 작성하고 체크포인트 선택하기**
    23. **모험 달성 이펙트 보기**
    24. **보물함으로가서 칭호와 보물함을 확인하기 -> 리뷰 작성하러 가기**
