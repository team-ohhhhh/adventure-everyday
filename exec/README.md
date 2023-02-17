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

```sql
-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: antennadb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adventure`
--

DROP TABLE IF EXISTS `adventure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure` (
  `adventure_id` bigint NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `avg_review_grade` double DEFAULT '0',
  `content` varchar(255) DEFAULT NULL,
  `difficulty` bigint NOT NULL,
  `end_date` datetime NOT NULL,
  `exp` bigint NOT NULL,
  `feat` varchar(255) NOT NULL,
  `photo_name` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`adventure_id`),
  KEY `FK467718mai7urcvo4dsvex2v14` (`category_id`),
  KEY `FK3jk08qo4mjt2xtxsrj5ecqxnu` (`user_id`),
  CONSTRAINT `FK3jk08qo4mjt2xtxsrj5ecqxnu` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK467718mai7urcvo4dsvex2v14` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure`
--

LOCK TABLES `adventure` WRITE;
/*!40000 ALTER TABLE `adventure` DISABLE KEYS */;
INSERT INTO `adventure` VALUES (1,'2023-02-15 14:23:26','2023-02-15 14:23:26',NULL,'역삼역 주변에서 찾은 제 맛집 리스트입니다 !!',1,'2023-12-31 00:00:00',12,'테헤란로맛집킬러','9ae07f82-7f75-4dc3-b617-b648223424b9.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/9ae07f82-7f75-4dc3-b617-b648223424b9.jpg','2023-02-15 00:00:00','역삼 맛집',2,1),(2,'2023-02-15 14:24:35','2023-02-15 16:02:02',5,'홍대 근처 맛집들입니다. 제 경험을 바탕으로 작성해봤습니다. 좋으셨다면 후기 부탁드려요!',1,'2023-03-15 00:00:00',31,'망원동 보안관 조수','4ce8839e-391e-4fd4-9a27-111cdb6ec102.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/4ce8839e-391e-4fd4-9a27-111cdb6ec102.jpg','2023-02-15 00:00:00','홍대 추천 맛집들',2,11),(52,'2023-02-15 15:10:25','2023-02-15 15:10:25',NULL,'목포갓바위 입니다~ 목포 지나갈 때 한 번씩 들려보세요~^^',1,'2023-02-28 00:00:00',1,'그저갓바위','91c33ae3-ce5c-4662-be75-7416ac8c4a12.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/91c33ae3-ce5c-4662-be75-7416ac8c4a12.jpg','2023-02-15 00:00:00','목포 로컬만 안다는',1,17),(53,'2023-02-15 15:22:37','2023-02-15 15:22:37',NULL,'엄선했습니다👍 함께 가시죠!!!',1,'2023-02-25 00:00:00',57,'여수를 맛본 자','658a16a6-7f87-4c03-8612-30659f084ba6.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/658a16a6-7f87-4c03-8612-30659f084ba6.jpg','2023-02-23 00:00:00','현지인 인증 맛집',2,16),(102,'2023-02-15 16:59:38','2023-02-15 16:59:38',NULL,'내가 제일 좋아하는 한강공원 러닝코스들 !!',1,'2023-12-31 00:00:00',93,'한리버러너러버','fd973fc7-5df5-45d1-ba97-e14254d3312d.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/fd973fc7-5df5-45d1-ba97-e14254d3312d.jpg','2023-02-15 00:00:00','한강공원 러닝코스',4,1),(103,'2023-02-15 17:07:44','2023-02-15 17:07:44',NULL,'겨울 바다를 구경하면서 마음의 안정을 찾아보세요.',2,'2023-03-31 00:00:00',327,'노스텔지아','bbed8e24-2986-40d3-9a32-61bc04b22479.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/bbed8e24-2986-40d3-9a32-61bc04b22479.jpg','2023-02-15 00:00:00','서울 근교 여행',1,18);
/*!40000 ALTER TABLE `adventure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adventure_in_progress`
--

DROP TABLE IF EXISTS `adventure_in_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure_in_progress` (
  `progress_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `clear_time` datetime(6) DEFAULT NULL,
  `current_point` int DEFAULT '0',
  `total_point` int NOT NULL,
  `adventure_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`progress_id`),
  KEY `FKbk0umyucsyc7jjp9olt421js7` (`adventure_id`),
  KEY `FK4qreufrku0btdip792qabnaxu` (`user_id`),
  CONSTRAINT `FK4qreufrku0btdip792qabnaxu` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKbk0umyucsyc7jjp9olt421js7` FOREIGN KEY (`adventure_id`) REFERENCES `adventure` (`adventure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure_in_progress`
--

LOCK TABLES `adventure_in_progress` WRITE;
/*!40000 ALTER TABLE `adventure_in_progress` DISABLE KEYS */;
INSERT INTO `adventure_in_progress` VALUES (5,'2023-02-15 14:34:50','2023-02-15 14:34:50',NULL,0,4,1,14),(6,'2023-02-15 14:36:21','2023-02-15 14:36:21',NULL,0,3,2,16),(7,'2023-02-15 15:09:39','2023-02-15 15:09:39',NULL,0,4,1,11),(8,'2023-02-15 15:10:45','2023-02-15 15:34:51',NULL,1,3,2,13),(10,'2023-02-15 15:18:38','2023-02-15 15:18:38',NULL,0,4,1,9),(11,'2023-02-15 15:24:32','2023-02-15 15:24:32',NULL,0,4,1,17),(12,'2023-02-15 15:24:48','2023-02-15 15:24:48',NULL,0,3,2,17),(13,'2023-02-15 15:24:57','2023-02-15 15:24:57',NULL,0,4,53,17),(14,'2023-02-15 15:35:28','2023-02-15 15:35:28',NULL,0,4,53,1),(15,'2023-02-15 16:25:25','2023-02-15 16:25:25',NULL,0,4,1,13),(16,'2023-02-15 17:08:14','2023-02-15 17:08:14',NULL,0,3,102,18),(17,'2023-02-15 17:08:26','2023-02-15 17:08:26',NULL,0,2,52,18);
/*!40000 ALTER TABLE `adventure_in_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adventure_like`
--

DROP TABLE IF EXISTS `adventure_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure_like` (
  `adventure_like_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `adventure_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`adventure_like_id`),
  KEY `FK73701vpxeawvud0rvlnuam51t` (`adventure_id`),
  KEY `FKin1eudxts2uyfqijcqdxgsbxc` (`user_id`),
  CONSTRAINT `FK73701vpxeawvud0rvlnuam51t` FOREIGN KEY (`adventure_id`) REFERENCES `adventure` (`adventure_id`),
  CONSTRAINT `FKin1eudxts2uyfqijcqdxgsbxc` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure_like`
--

LOCK TABLES `adventure_like` WRITE;
/*!40000 ALTER TABLE `adventure_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `adventure_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adventure_place`
--

DROP TABLE IF EXISTS `adventure_place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure_place` (
  `adventure_place_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `coordinate` point NOT NULL,
  `photo` blob,
  `title` varchar(255) NOT NULL,
  `adventure_id` bigint DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`adventure_place_id`),
  KEY `FKsdr11tuvnafi0sslu3nqbmvd9` (`adventure_id`),
  KEY `FK79toj4f4v1ol72lcstfc761c5` (`post_id`),
  CONSTRAINT `FK79toj4f4v1ol72lcstfc761c5` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `FKsdr11tuvnafi0sslu3nqbmvd9` FOREIGN KEY (`adventure_id`) REFERENCES `adventure` (`adventure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure_place`
--

LOCK TABLES `adventure_place` WRITE;
/*!40000 ALTER TABLE `adventure_place` DISABLE KEYS */;
INSERT INTO `adventure_place` VALUES (1,'2023-02-15 14:23:26','2023-02-15 14:23:26','가성비 좋은 중국집',_binary '\0\0\0\0\0\0\0\�B;�Y\�_@x\�=\\r�B@',NULL,'마파두부',1,10),(2,'2023-02-15 14:23:26','2023-02-15 14:23:26','라떼맛집',_binary '\0\0\0\0\0\0\0@\r�\�_@���X��B@',NULL,'고양이카페',1,11),(3,'2023-02-15 14:23:26','2023-02-15 14:23:26','치즈돈까스 맛집',_binary '\0\0\0\0\0\0\0��@�\�_@��E\�n�B@',NULL,'돈까스',1,12),(4,'2023-02-15 14:23:26','2023-02-15 14:23:26','가성비 규카츠',_binary '\0\0\0\0\0\0\0�&3\�V\�_@(Hlw�B@',NULL,'규카츠',1,9),(5,'2023-02-15 14:24:35','2023-02-15 14:24:35','진짜 안가면 후회하는 곳,,, 명란오일 파스타도 너무 맛있었어요',_binary '\0\0\0\0\0\0\0��_@pz\�\�\�B@',NULL,'연남 맛집!',2,8),(6,'2023-02-15 14:24:35','2023-02-15 14:24:35','평소에 김토끼 좋아하셨으면 이번 기회에 방문해보세요ㅎ',_binary '\0\0\0\0\0\0\08\�\�_@\�!H\�B@',NULL,'김토끼 팝업스토어',2,6),(7,'2023-02-15 14:24:35','2023-02-15 14:24:35','강아지가 너무 샤프하고 멋져서 자주 오는 곳이에요',_binary '\0\0\0\0\0\0\0\'ݖ\��_@���)\�B@',NULL,'집 근처 카페',2,14),(8,'2023-02-15 15:10:25','2023-02-15 15:10:25','강이 너무 예쁘고 생각하기 좋아요',_binary '\0\0\0\0\0\0\0#�\�fF�_@�&�feA@',NULL,'목포 로컬만 아는곳',52,17),(9,'2023-02-15 15:10:25','2023-02-15 15:10:25','꼭 한 번 가보세요. 강추!!',_binary '\0\0\0\0\0\0\0�(\�\�=�_@�\�\"[eA@',NULL,'목포 로컬만 안다는',52,18),(10,'2023-02-15 15:22:37','2023-02-15 15:22:37','여기 진짜 안가면 여수여행 헛 다녀온 거죠 진짜',_binary '\0\0\0\0\0\0\0\�o�\�\�_@\�\�<�;aA@',NULL,'\"싱싱해마차“',53,22),(11,'2023-02-15 15:22:37','2023-02-15 15:22:37','고양이와 함께 콘파냐 한 잔',_binary '\0\0\0\0\0\0\0b��\�\�\�_@a\Z���aA@',NULL,'콘파냐 맛집',53,20),(12,'2023-02-15 15:22:37','2023-02-15 15:22:37','게장백반과 함께 나오는 고등어 조림이 찐이에요!',_binary '\0\0\0\0\0\0\0ē\�\�\�\�_@��<eaA@',NULL,'고등어조림',53,19),(13,'2023-02-15 15:22:37','2023-02-15 15:22:37','소스가 일품!!',_binary '\0\0\0\0\0\0\0�S;\�\�\�_@��s�aA@',NULL,'콥샐러드',53,16),(14,'2023-02-15 16:59:38','2023-02-15 16:59:38','잠원한강공원',_binary '\0\0\0\0\0\0\0�\�v\�\0�_@b�k_@\�B@',NULL,'압구정',102,46),(15,'2023-02-15 16:59:38','2023-02-15 16:59:38','뚝섬유원지 한강공원',_binary '\0\0\0\0\0\0\0N\�\�\�\n\�_@J_9\�\�B@',NULL,'뚝섬유원지',102,44),(16,'2023-02-15 16:59:38','2023-02-15 16:59:38','잠실한강공원',_binary '\0\0\0\0\0\0\0z\0���\�_@\�)s\�\�B@',NULL,'잠실나루',102,43),(17,'2023-02-15 17:07:44','2023-02-15 17:07:44','대부도 좋아요부도',_binary '\0\0\0\0\0\0\0��#��_@���\�ۣB@',NULL,'대부도 놀러오세부도',103,42),(18,'2023-02-15 17:07:44','2023-02-15 17:07:44','을왕리 오면 반드시 방문하셔야 하는 카페입니다.',_binary '\0\0\0\0\0\0\0\�O\�ޗ_@\�س\�2�B@',NULL,'을왕리 카페',103,45),(19,'2023-02-15 17:07:44','2023-02-15 17:07:44','을왕리 카페에서 야무지게 구경하시고 나오셔서 석양이 지는 바다를 구경하세요.',_binary '\0\0\0\0\0\0\0\�+�z��_@��a�B@',NULL,'을왕리 바다',103,51);
/*!40000 ALTER TABLE `adventure_place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adventure_review`
--

DROP TABLE IF EXISTS `adventure_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure_review` (
  `adventure_review_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `grade` int NOT NULL,
  `adventure_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`adventure_review_id`),
  KEY `FKalp4ad6y7b8ydkox6nr775usl` (`adventure_id`),
  KEY `FKgo40n1vlvjwctjqebolooknyb` (`user_id`),
  CONSTRAINT `FKalp4ad6y7b8ydkox6nr775usl` FOREIGN KEY (`adventure_id`) REFERENCES `adventure` (`adventure_id`),
  CONSTRAINT `FKgo40n1vlvjwctjqebolooknyb` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure_review`
--

LOCK TABLES `adventure_review` WRITE;
/*!40000 ALTER TABLE `adventure_review` DISABLE KEYS */;
INSERT INTO `adventure_review` VALUES (1,'2023-02-15 16:02:02','2023-02-15 16:02:02','최근에 홍대 주변으로 자주 놀러가는데 너무 좋은 탐험이었어요 !!',5,2,1);
/*!40000 ALTER TABLE `adventure_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adventure_seq`
--

DROP TABLE IF EXISTS `adventure_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure_seq`
--

LOCK TABLES `adventure_seq` WRITE;
/*!40000 ALTER TABLE `adventure_seq` DISABLE KEYS */;
INSERT INTO `adventure_seq` VALUES (201);
/*!40000 ALTER TABLE `adventure_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adventure_succeed`
--

DROP TABLE IF EXISTS `adventure_succeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adventure_succeed` (
  `succeed_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `selected` tinyint(1) DEFAULT '0',
  `adventure_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`succeed_id`),
  KEY `FK3apalhc4v4s2fs8ddejf3mhj6` (`adventure_id`),
  KEY `FK468dy2q01bwdjm62yyiacj8sm` (`user_id`),
  CONSTRAINT `FK3apalhc4v4s2fs8ddejf3mhj6` FOREIGN KEY (`adventure_id`) REFERENCES `adventure` (`adventure_id`),
  CONSTRAINT `FK468dy2q01bwdjm62yyiacj8sm` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adventure_succeed`
--

LOCK TABLES `adventure_succeed` WRITE;
/*!40000 ALTER TABLE `adventure_succeed` DISABLE KEYS */;
INSERT INTO `adventure_succeed` VALUES (1,'2023-02-15 16:01:07','2023-02-15 16:01:07',0,2,1);
/*!40000 ALTER TABLE `adventure_succeed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antenna`
--

DROP TABLE IF EXISTS `antenna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antenna` (
  `antenna_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `area` int NOT NULL,
  `coordinate` point NOT NULL,
  `nearest_place` varchar(50) NOT NULL,
  `w3w` varchar(50) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`antenna_id`),
  KEY `FKg1rg39debfcpjk3ohbsrohid0` (`user_id`),
  CONSTRAINT `FKg1rg39debfcpjk3ohbsrohid0` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antenna`
--

LOCK TABLES `antenna` WRITE;
/*!40000 ALTER TABLE `antenna` DISABLE KEYS */;
INSERT INTO `antenna` VALUES (1,'2023-02-15 15:10:54','2023-02-15 15:10:54',1,_binary '\0\0\0\0\0\0\0�\�\�(\\�_@ZJ��P�B@','서울특별시','수납장.읽는다.전공한',1),(2,'2023-02-15 15:36:07','2023-02-15 15:36:07',1,_binary '\0\0\0\0\0\0\0\�\�\�_@�\\\�].�B@','서울특별시','입다.끓이다.감자',13),(4,'2023-02-15 16:02:05','2023-02-15 16:02:05',1,_binary '\0\0\0\0\0\0\0�l;m�\�_@\Z�uT5�B@','서울특별시','진동.수화.화보',9),(5,'2023-02-15 16:14:49','2023-02-15 16:14:49',1,_binary '\0\0\0\0\0\0\0\�\�\�_@�\\\�].�B@','서울특별시','입다.끓이다.감자',9),(7,'2023-02-15 17:03:03','2023-02-15 17:03:03',1,_binary '\0\0\0\0\0\0\0�\�HL\�_@�I*S̿B@','서울특별시','통한다.근로.회사',14),(8,'2023-02-15 17:03:20','2023-02-15 17:03:20',1,_binary '\0\0\0\0\0\0\0ΎT\���_@L�\ZgӿB@','서울특별시','급함.판매.전화번호',14);
/*!40000 ALTER TABLE `antenna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'2023-02-15 14:23:19','2023-02-15 14:23:19','여행'),(2,'2023-02-15 14:23:19','2023-02-15 14:23:19','맛집'),(3,'2023-02-15 14:23:19','2023-02-15 14:23:19','추억'),(4,'2023-02-15 14:23:19','2023-02-15 14:23:19','운동'),(5,'2023-02-15 14:23:19','2023-02-15 14:23:19','취미');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkpoint`
--

DROP TABLE IF EXISTS `checkpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkpoint` (
  `checkpoint_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `adventure_place_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`checkpoint_id`),
  KEY `FKs2dscxo1kq2lbp7qjpggaom6c` (`adventure_place_id`),
  KEY `FKcg9ta6mn8wbfa9qtdwn5xfi71` (`user_id`),
  CONSTRAINT `FKcg9ta6mn8wbfa9qtdwn5xfi71` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKs2dscxo1kq2lbp7qjpggaom6c` FOREIGN KEY (`adventure_place_id`) REFERENCES `adventure_place` (`adventure_place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkpoint`
--

LOCK TABLES `checkpoint` WRITE;
/*!40000 ALTER TABLE `checkpoint` DISABLE KEYS */;
INSERT INTO `checkpoint` VALUES (1,'2023-02-15 15:34:51','2023-02-15 15:34:51',5,13),(2,'2023-02-15 15:39:57','2023-02-15 15:39:57',5,1),(3,'2023-02-15 15:56:14','2023-02-15 15:56:14',6,1),(4,'2023-02-15 16:01:07','2023-02-15 16:01:07',7,1);
/*!40000 ALTER TABLE `checkpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkpoint_post`
--

DROP TABLE IF EXISTS `checkpoint_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkpoint_post` (
  `checkpoint_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `adventure_id` bigint DEFAULT NULL,
  `adventure_place_id` bigint DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`checkpoint_id`),
  KEY `FKc9k8w62dyhn7rvfi2j8o6xxsu` (`adventure_id`),
  KEY `FK3a7laqj613gkrrgf7snwhh779` (`adventure_place_id`),
  KEY `FKfnkr0m2p77jnxxq7m8djpr8cm` (`post_id`),
  CONSTRAINT `FK3a7laqj613gkrrgf7snwhh779` FOREIGN KEY (`adventure_place_id`) REFERENCES `adventure_place` (`adventure_place_id`),
  CONSTRAINT `FKc9k8w62dyhn7rvfi2j8o6xxsu` FOREIGN KEY (`adventure_id`) REFERENCES `adventure` (`adventure_id`),
  CONSTRAINT `FKfnkr0m2p77jnxxq7m8djpr8cm` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkpoint_post`
--

LOCK TABLES `checkpoint_post` WRITE;
/*!40000 ALTER TABLE `checkpoint_post` DISABLE KEYS */;
INSERT INTO `checkpoint_post` VALUES (1,'2023-02-15 15:34:51','2023-02-15 15:34:51',2,5,35),(2,'2023-02-15 15:39:57','2023-02-15 15:39:57',2,5,37),(3,'2023-02-15 15:56:14','2023-02-15 15:56:14',2,6,38),(4,'2023-02-15 16:01:07','2023-02-15 16:01:07',2,7,39);
/*!40000 ALTER TABLE `checkpoint_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `content` varchar(300) NOT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'2023-02-15 14:39:55','2023-02-15 14:39:55','고양이가 도와주고 있네요 ㅠㅠㅠㅠㅠ 벌써완성 ㅠ',1,16),(2,'2023-02-15 15:17:44','2023-02-15 15:17:44','진짜 꼭 가볼게여 !!',26,1),(3,'2023-02-15 15:23:34','2023-02-15 15:23:34','wow',16,14),(4,'2023-02-15 15:37:25','2023-02-15 15:37:25','여수 옆에 목포도 놀러와보세요~~~',26,17),(9,'2023-02-15 16:33:48','2023-02-15 16:33:48','정말 맛있어 보이네요 ㅎㅎ',40,13),(10,'2023-02-15 16:34:27','2023-02-15 16:34:27','즐거워 보이네요~~',3,13),(11,'2023-02-15 17:00:51','2023-02-15 17:00:51','딸샷추인가요 ?',40,1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_like`
--

DROP TABLE IF EXISTS `comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_like` (
  `comment_like_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `comment_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_like_id`),
  KEY `FKqlv8phl1ibeh0efv4dbn3720p` (`comment_id`),
  KEY `FK6arwb0j7by23pw04ljdtxq4p5` (`user_id`),
  CONSTRAINT `FK6arwb0j7by23pw04ljdtxq4p5` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKqlv8phl1ibeh0efv4dbn3720p` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_like`
--

LOCK TABLES `comment_like` WRITE;
/*!40000 ALTER TABLE `comment_like` DISABLE KEYS */;
INSERT INTO `comment_like` VALUES (1,'2023-02-15 15:14:30','2023-02-15 15:14:30',1,1),(2,'2023-02-15 15:23:07','2023-02-15 15:23:07',2,16),(4,'2023-02-15 15:23:40','2023-02-15 15:23:40',3,14),(5,'2023-02-15 16:06:15','2023-02-15 16:06:15',3,16);
/*!40000 ALTER TABLE `comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email` (
  `email_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `auth_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` VALUES (1,'2023-02-15 12:28:15','2023-02-15 12:28:15','079068','thomazkwon@gmail.com'),(2,'2023-02-15 12:28:35','2023-02-15 12:28:35','016294','myungho96@naver.com'),(4,'2023-02-15 12:50:08','2023-02-15 12:50:08','236246','gittgi786@gmail.com'),(6,'2023-02-15 12:53:30','2023-02-15 12:53:30','045843','gittgi768@gmail.com'),(7,'2023-02-15 13:05:39','2023-02-15 13:05:39','387526','kdoubleh22@naver.com'),(8,'2023-02-15 14:04:15','2023-02-15 14:04:15','725850','silverain_9@naver.com'),(9,'2023-02-15 14:23:03','2023-02-15 14:23:03','389094','dolpong_@naver.com');
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follow_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `follower_id` bigint DEFAULT NULL,
  `following_id` bigint DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FKmow2qk674plvwyb4wqln37svv` (`follower_id`),
  KEY `FKqme6uru2g9wx9iysttk542esm` (`following_id`),
  CONSTRAINT `FKmow2qk674plvwyb4wqln37svv` FOREIGN KEY (`follower_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKqme6uru2g9wx9iysttk542esm` FOREIGN KEY (`following_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,'2023-02-15 12:42:28','2023-02-15 12:42:28',5,4),(4,'2023-02-15 14:23:53','2023-02-15 14:23:53',1,2),(5,'2023-02-15 14:24:09','2023-02-15 14:24:09',1,15),(6,'2023-02-15 14:24:31','2023-02-15 14:24:31',1,9),(7,'2023-02-15 14:32:53','2023-02-15 14:32:53',16,1),(8,'2023-02-15 14:33:27','2023-02-15 14:33:27',15,16),(9,'2023-02-15 14:34:10','2023-02-15 14:34:10',1,16),(10,'2023-02-15 14:34:20','2023-02-15 14:34:20',1,17),(11,'2023-02-15 14:35:00','2023-02-15 14:35:00',16,15),(12,'2023-02-15 14:35:12','2023-02-15 14:35:12',17,1),(13,'2023-02-15 14:36:56','2023-02-15 14:36:56',17,16),(14,'2023-02-15 14:41:25','2023-02-15 14:41:25',16,17),(16,'2023-02-15 15:19:02','2023-02-15 15:19:02',14,1),(17,'2023-02-15 15:19:16','2023-02-15 15:19:16',14,17),(19,'2023-02-15 15:22:48','2023-02-15 15:22:48',14,16),(20,'2023-02-15 15:37:07','2023-02-15 15:37:07',1,14),(22,'2023-02-15 16:09:14','2023-02-15 16:09:14',16,14),(23,'2023-02-15 16:09:35','2023-02-15 16:09:35',16,11),(24,'2023-02-15 16:09:44','2023-02-15 16:09:44',16,9),(25,'2023-02-15 16:25:04','2023-02-15 16:25:04',1,4),(27,'2023-02-15 16:28:13','2023-02-15 16:28:13',17,14),(28,'2023-02-15 16:28:22','2023-02-15 16:28:22',17,2),(29,'2023-02-15 17:06:31','2023-02-15 17:06:31',19,1);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `coordinate` point NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `nearest_place` varchar(50) NOT NULL,
  `photo_name` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `w3w` varchar(50) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`user_id`),
  CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'2023-02-15 12:35:47','2023-02-15 12:35:47','이케아 조립 어렵다…',_binary '\0\0\0\0\0\0\0\�P�[�_@g,�\�N�B@',1,'서울특별시','42d33f44-6917-4d44-956f-38fed66fdaec.jpeg','https://s3.ap-northeast-2.amazonaws.com/bucket305/42d33f44-6917-4d44-956f-38fed66fdaec.jpeg','IKEA','미션.평화.남자',1),(3,'2023-02-15 12:40:27','2023-02-15 12:40:27','양도 많고 맛있어요 !!',_binary '\0\0\0\0\0\0\0!w�(\�_@(Hlw�B@',1,'서울특별시','9a9619de-b384-4213-a6f2-b7e05d66a4a5.jpeg','https://s3.ap-northeast-2.amazonaws.com/bucket305/9a9619de-b384-4213-a6f2-b7e05d66a4a5.jpeg','역삼역 맛집','예산.내색.일하다',1),(4,'2023-02-15 12:41:21','2023-02-15 12:41:21','맛있읍니다',_binary '\0\0\0\0\0\0\0j�drj\�_@(,\�\�B@',1,'서울특별시','6b330091-9647-42b0-b932-db92199290cb.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/6b330091-9647-42b0-b932-db92199290cb.jpg','오코노미야끼','연맹.노랑.형식',4),(5,'2023-02-15 12:43:52','2023-02-15 12:43:52','나는 물뚱뚱이 하마입니다',_binary '\0\0\0\0\0\0\0c\� \�m`@s\���\�B@',1,'강원도 강릉시','65e7e31f-b35f-4b1a-8360-c04a8ad7b739.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/65e7e31f-b35f-4b1a-8360-c04a8ad7b739.jpg','그리워요 푸른 바다','메조피아노.공평해졌다.배웅',5),(6,'2023-02-15 14:06:02','2023-02-15 14:06:02','평소에 김토끼 너무 좋아해서 갔다왔는데 진짜 너무 좋았어요 ㅠㅠㅠ 굿즈도 많고 행복 그자체!! 추천합니다!',_binary '\0\0\0\0\0\0\08\�\�_@\�!H\�B@',1,'서울특별시','4ce8839e-391e-4fd4-9a27-111cdb6ec102.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/4ce8839e-391e-4fd4-9a27-111cdb6ec102.jpg','김토끼 팝업스토어','남았다.헬기.깊은',11),(7,'2023-02-15 14:08:40','2023-02-15 14:08:40','낮잠을 자고 있는 귀여운 백구네요~',_binary '\0\0\0\0\0\0\0�\r2\�ȹ_@�{,}\�@@',1,'제주특별자치도 제주시','4100e39f-6bb7-4921-a26e-9ef7f6c0668f.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/4100e39f-6bb7-4921-a26e-9ef7f6c0668f.jpg','하얀 마음 백구','관광지.뛰어갔다.낮은',15),(8,'2023-02-15 14:10:52','2023-02-15 14:10:52','연남동에 있는 레스토랑! ',_binary '\0\0\0\0\0\0\0��_@pz\�\�\�B@',1,'서울특별시','c0763388-2d25-4f5b-a697-af4ce3d71c68.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/c0763388-2d25-4f5b-a697-af4ce3d71c68.jpg','너무 맛있어요','본교.사옥.천연',11),(9,'2023-02-15 14:11:23','2023-02-15 14:11:23','가성비 좋아요 !!',_binary '\0\0\0\0\0\0\0�&3\�V\�_@(Hlw�B@',1,'서울특별시','9252c1ee-c2aa-4528-8278-51f85b504490.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/9252c1ee-c2aa-4528-8278-51f85b504490.jpg','역삼역 규카츠 맛집','어젯밤.팝송.느꼈다',1),(10,'2023-02-15 14:15:14','2023-02-15 14:15:14','최근에 오픈한 집인데 완전 맛있어요 !!',_binary '\0\0\0\0\0\0\0\�B;�Y\�_@x\�=\\r�B@',1,'서울특별시','9ae07f82-7f75-4dc3-b617-b648223424b9.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/9ae07f82-7f75-4dc3-b617-b648223424b9.jpg','강남 마파두부 맛집','암탉.믿음.그러면',1),(11,'2023-02-15 14:15:54','2023-02-15 14:15:54','범표라떼 맛있고 고양이 너무 귀여워요 !! ',_binary '\0\0\0\0\0\0\0@\r�\�_@���X��B@',1,'서울특별시','38f7f7e1-b291-4a39-bb78-f2604e6722af.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/38f7f7e1-b291-4a39-bb78-f2604e6722af.jpg','역삼 고양이 카페 ','능률.최소.후불',1),(12,'2023-02-15 14:16:31','2023-02-15 14:16:31','사람 많지만 기다릴만 한거같아요 !!',_binary '\0\0\0\0\0\0\0��@�\�_@��E\�n�B@',1,'서울특별시','c5cfb073-8650-4fa2-965f-3671f302a598.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/c5cfb073-8650-4fa2-965f-3671f302a598.jpg','역삼동 돈까스 맛집','게다가.족발.머리핀',1),(13,'2023-02-15 14:18:19','2023-02-15 14:18:19','집 앞에 있는 줄무늬가 예쁜 고양이에요 ㅎㅎ',_binary '\0\0\0\0\0\0\0��\��\r\�_@0�̕aA@',1,'전라남도 여수시','a0cb8515-f1ae-4656-9d4c-b9bdca1cb5a9.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/a0cb8515-f1ae-4656-9d4c-b9bdca1cb5a9.jpg','커여운 고양이','전설적.사귄다.물길',15),(14,'2023-02-15 14:18:22','2023-02-15 14:18:22','강아지가 너무 귀여워요 ㅎㅎ',_binary '\0\0\0\0\0\0\0\'ݖ\��_@���)\�B@',1,'서울특별시','1e6a9cc3-2dfd-4b16-b2d5-3753468e4134.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/1e6a9cc3-2dfd-4b16-b2d5-3753468e4134.jpg','상수에 있는 카페','물어본.소양.닳다',11),(15,'2023-02-15 14:42:52','2023-02-15 14:42:52','그리고 바다.',_binary '\0\0\0\0\0\0\0����\�_@��W\�2�@@',1,'제주특별자치도 서귀포시','542c2df6-a635-4bba-94f8-94e2dccb7136.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/542c2df6-a635-4bba-94f8-94e2dccb7136.jpg','하늘.','애증.지닌.식빵',17),(16,'2023-02-15 14:49:11','2023-02-15 14:49:11','콥샐러드가 기가 막히게 맛있는 맛집! 토핑도 야무지지만 소스가 넘사;; 이 소스를 찾아 서울에서 수많은 콥샐러드를 사먹어봤지만, 포기😫',_binary '\0\0\0\0\0\0\0�S;\�\�\�_@��s�aA@',1,'전라남도 여수시','6e47bdcd-007c-4895-9636-3a13d67028d4.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/6e47bdcd-007c-4895-9636-3a13d67028d4.jpg','콥샐러드 맛집','유리.연구소.작가',16),(17,'2023-02-15 14:50:09','2023-02-15 14:50:09','강과 나무 바위의 조합 힐링하고가세요~',_binary '\0\0\0\0\0\0\0#�\�fF�_@�&�feA@',1,'전라남도 목포시','07be7471-1549-4ecf-afa6-53307e71ffc3.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/07be7471-1549-4ecf-afa6-53307e71ffc3.jpg','너무 예쁜 강이에요','고친다.유리창.촛불',17),(18,'2023-02-15 14:54:19','2023-02-15 14:54:19','바위가 정말 예쁘게 생겼어요! 제 인생 여행지 중 한 곳입니다~~',_binary '\0\0\0\0\0\0\0�(\�\�=�_@�\�\"[eA@',1,'전라남도 목포시','91c33ae3-ce5c-4662-be75-7416ac8c4a12.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/91c33ae3-ce5c-4662-be75-7416ac8c4a12.jpg','예쁜 바위','데이터.보인다.유물',17),(19,'2023-02-15 14:55:27','2023-02-15 14:55:27','게장맛은 어느 가게를 가나 비슷하지만, 고등어 조림이 여기가 제일 맛있습니다 흑흑 고등어 조림은 반찬으로 나오는데, 더 먹고 싶으면 5천원 내고 한 번 더 받으실 수 있어요~! \r\n\r\n주차불편 주의',_binary '\0\0\0\0\0\0\0ē\�\�\�\�_@��<eaA@',1,'전라남도 여수시','418947ff-eb94-467c-9f8a-41cb53aed8b0.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/418947ff-eb94-467c-9f8a-41cb53aed8b0.jpg','게장백반','찬바람.단풍잎.참여',16),(20,'2023-02-15 14:59:43','2023-02-15 14:59:43','나른이라는 카페인데, 여기는 콘파냐가 시그니쳐입니다 ㄷㄷㄷ 콘파냐가................ 씁쓸한 샷이 입에 들어올 때쯤..! 달달한 아몬드 크림우유가 사악 들어옵니다 ㄷㄷ 진짜 앉은 자리에서 두 잔을 마셔도 절대 안 질리는 맛!! 여수가면 꼭 챙겨먹는 콘파냐쥬',_binary '\0\0\0\0\0\0\0b��\�\�\�_@a\Z���aA@',1,'전라남도 여수시','b1b6d3c5-37e2-4ee7-95b6-add637a95ebe.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/b1b6d3c5-37e2-4ee7-95b6-add637a95ebe.jpg','나른','트럭.영양분.섞임',16),(21,'2023-02-15 15:04:06','2023-02-15 15:04:06','다 먹은 반찬이지만, 그래도 한번 스윽 봐보시렵니까? 전복회, 멍게, 물회, 삼계탕이 반찬으로 나옵니다 덜덜;; ',_binary '\0\0\0\0\0\0\0\�7Ӆ\�_@\�\�<�;aA@',1,'전라남도 여수시','321f8050-b9e1-42b6-80e0-a8a62402cf95.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/321f8050-b9e1-42b6-80e0-a8a62402cf95.jpg','싱싱해마차 1','발생.적당한.벌써',16),(22,'2023-02-15 15:06:12','2023-02-15 15:06:12','메인 디쉬 모듬회!! 싱싱하고 아주 좋았습니다! 어종이 기억은 안 나는데 광어 빼고는 사장님께서 직접 낚아오셨다고 했습니다 덜덜 약간 지인찬스이긴 하지만.. 하여튼 가끔 자연산도 내주십니다 ㄷ',_binary '\0\0\0\0\0\0\0\�o�\�\�_@\�\�<�;aA@',1,'전라남도 여수시','658a16a6-7f87-4c03-8612-30659f084ba6.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/658a16a6-7f87-4c03-8612-30659f084ba6.jpg','싱싱해마차 2','얼굴.음력.휜다',16),(23,'2023-02-15 15:07:35','2023-02-15 15:07:35','회가 끝나면 구이! 아주 실한 두 마리가 나옵니다',_binary '\0\0\0\0\0\0\0�e���\�_@\�\�\�:aA@',1,'전라남도 여수시','0024d50d-1464-4054-a7e1-8dfd1e042dcf.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/0024d50d-1464-4054-a7e1-8dfd1e042dcf.jpg','싱싱해마차 3','지름길.게시물.도장',16),(24,'2023-02-15 15:07:36','2023-02-15 15:07:36','회가 끝나면 구이! 아주 실한 두 마리가 나옵니다',_binary '\0\0\0\0\0\0\0�e���\�_@\�\�\�:aA@',1,'전라남도 여수시','c10063ba-24a9-4bd3-a8a5-7c625d163811.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/c10063ba-24a9-4bd3-a8a5-7c625d163811.jpg','싱싱해마차 3','지름길.게시물.도장',16),(25,'2023-02-15 15:09:38','2023-02-15 15:09:38','아직 끝나지 않았습니다;; 구이 다음에는 복어, 전복, 하모 샤브샤브가 나와요! 복어 샤브샤브 식감이 진짜 신기했어요 탱글탱글',_binary '\0\0\0\0\0\0\0\�\�n�\�_@\�\�<�;aA@',1,'전라남도 여수시','24676d64-ab2c-4b6a-bca7-ff470eec2b44.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/24676d64-ab2c-4b6a-bca7-ff470eec2b44.jpg','싱싱해마차 4','수심.관중.양초',16),(26,'2023-02-15 15:12:55','2023-02-15 15:12:55','진짜 마지막! 새우와 고구마와 단호박 튀김입니다 ㄷ 빠삭빠삭\r\n\r\n1~5까지 해서 4인이 14만원ㄷㄷ 이게 말이 되는 말이냐구요;;;; 진짜 곧 서버 닫히니까 알려드리는 찐 맛집입니다;;; 다들 머리에 새기세요! 싱싱해마차!!',_binary '\0\0\0\0\0\0\0�e���\�_@\�\�\�:aA@',1,'전라남도 여수시','3b2a7e87-d7bc-48a7-9b6a-30dc7b5dfbc8.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/3b2a7e87-d7bc-48a7-9b6a-30dc7b5dfbc8.jpg','싱싱해마차 마지막','지름길.게시물.도장',16),(35,'2023-02-15 15:34:51','2023-02-15 15:34:51','파스타 너무 맛있어요 ㅎㅎㅎ 친구랑 같이 먹었어요! 명란크림파스타 최고최고',_binary '\0\0\0\0\0\0\0U����_@vk�\�\�B@',1,'서울특별시','bb6cccb7-49d9-4a44-944b-bec2a6b39442.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/bb6cccb7-49d9-4a44-944b-bec2a6b39442.jpg','파스타 너무 맛있어','당번.즐긴.운영',13),(36,'2023-02-15 15:38:21','2023-02-15 15:47:52','아주 맛있읍니다',_binary '\0\0\0\0\0\0\0�\��\�x�_@\�\�x\�@�B@',0,'인천광역시','f3c88233-876b-4281-a746-4b68ab181c50.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/f3c88233-876b-4281-a746-4b68ab181c50.jpg','꼬치 훠궈','토끼.잠깐.정직한',4),(37,'2023-02-15 15:39:57','2023-02-15 15:39:57','파스타살살녹...',_binary '\0\0\0\0\0\0\0U����_@vk�\�\�B@',1,'서울특별시','2cd346de-ddc0-47e3-b1e8-f4318efb2bf4.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/2cd346de-ddc0-47e3-b1e8-f4318efb2bf4.jpg','살살녹...','당번.즐긴.운영',1),(38,'2023-02-15 15:56:14','2023-02-15 15:56:14','올만한듯 !! ',_binary '\0\0\0\0\0\0\0;�� \�_@\�!H\�B@',1,'서울특별시','8f037b7e-3f58-44db-b6d1-2e6b4c3550d4.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/8f037b7e-3f58-44db-b6d1-2e6b4c3550d4.jpg','김토끼 졸귀','평가.정식.알맞다',1),(39,'2023-02-15 16:01:07','2023-02-15 16:01:07','강아지 넘 귀여워요 !! ',_binary '\0\0\0\0\0\0\0�2\��_@\��R%\�B@',1,'서울특별시','1a71887a-ed82-4561-8d36-0dfb249ea188.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/1a71887a-ed82-4561-8d36-0dfb249ea188.jpg','자이언티 카페','모터.건축.형제',1),(40,'2023-02-15 16:26:05','2023-02-15 16:51:06','텐퍼센트 딸기라떼 맛있어요',_binary '\0\0\0\0\0\0\0\�\�\�_@\�$\\\�#�B@',1,'서울특별시','d8cc2db3-fa46-446d-aa7b-65d89b6bc0ba.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/d8cc2db3-fa46-446d-aa7b-65d89b6bc0ba.jpg','우유에 딸기 추가!','평소.실크.우박',4),(41,'2023-02-15 16:43:59','2023-02-15 16:43:59','유명하다고 해서 가봤는데 고기가 커서 먹는 느낌이 있네요 ㅎㅎ 좋았습니다',_binary '\0\0\0\0\0\0\0�D��_@\�X\�\��B@',1,'서울특별시','363a3a4f-ad8c-45b5-9227-8401f8162eb7.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/363a3a4f-ad8c-45b5-9227-8401f8162eb7.jpg','사당역 쌀국수 맛집','원숭이.의존.보석',13),(42,'2023-02-15 16:54:20','2023-02-15 16:54:20','물은 빠졌지만 하늘이 너무 맑고 아름다웠어요... 노다니는 왜가리를 보며 바닷바람을 맞고 있자니 평화로움이 마음속으로 절로 들어오는 듯 하네요 여러분도 오셔서 힐링하시길 바랄게요',_binary '\0\0\0\0\0\0\0��#��_@���\�ۣB@',1,'인천광역시','a9276526-3be9-4968-9f50-dc50f6efa272.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/a9276526-3be9-4968-9f50-dc50f6efa272.jpg','대부도의 바다','간접.아무.넘치는',18),(43,'2023-02-15 16:55:57','2023-02-15 16:55:57','사람도 많이 없고 좋아요 !!',_binary '\0\0\0\0\0\0\0z\0���\�_@\�)s\�\�B@',1,'서울특별시','278071c3-1e2e-46b6-addc-6b5fba15e34f.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/278071c3-1e2e-46b6-addc-6b5fba15e34f.jpg','잠실한강공원','맛있게.펼친.뛰기',1),(44,'2023-02-15 16:56:28','2023-02-15 16:56:28','사람은 많지만 편의시설도 많고 좋아요 !!',_binary '\0\0\0\0\0\0\0N\�\�\�\n\�_@J_9\�\�B@',1,'서울특별시','14762ff2-9e24-488a-8a0d-2e2959508f3b.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/14762ff2-9e24-488a-8a0d-2e2959508f3b.jpg','뚝섬유원지','간단한.즐기는.맹물',1),(45,'2023-02-15 16:56:40','2023-02-15 16:56:40','을왕리의 아름다운 카페에 앉아 커피 한잔을 하며 바다를 보았습니다.\r\n때마침 지는 노을을 보고 있자니 삶이란 무엇일까 하는 생각을 하게 되네요.\r\n커피는 그렇게 맛있지 않았지만 뷰 맛집으로 적극추천합니다.',_binary '\0\0\0\0\0\0\0\�O\�ޗ_@\�س\�2�B@',1,'인천광역시','50ebb229-67c6-4627-a725-e598d9ccd812.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/50ebb229-67c6-4627-a725-e598d9ccd812.jpg','을왕리 카페','경향.조용하다.연구소',18),(46,'2023-02-15 16:57:10','2023-02-15 16:57:10','가장 좋아하는 한강공원 !! 러닝하기에도 좋아요 !!',_binary '\0\0\0\0\0\0\0�\�v\�\0�_@b�k_@\�B@',1,'서울특별시','fd973fc7-5df5-45d1-ba97-e14254d3312d.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/fd973fc7-5df5-45d1-ba97-e14254d3312d.jpg','잠원한강공원','아래쪽.잡다.고려',1),(48,'2023-02-15 17:00:34','2023-02-15 17:00:34','제주도의 정감이 묻어있는 흔하지만 흔한지 않은 제주도 거리입니다.\r\n혼저옵서예~',_binary '\0\0\0\0\0\0\0W\�\��_@��\�f��@@',1,'제주특별자치도 서귀포시','8acb73dd-fa7e-4697-b283-26e4093d9326.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/8acb73dd-fa7e-4697-b283-26e4093d9326.jpg','제주도 거리','음악.부추.고향',15),(49,'2023-02-15 17:01:52','2023-02-15 17:01:52','한국에서 이국의 정취를 느낄 수 있는\r\n제주 야자수 가로수입니데이~',_binary '\0\0\0\0\0\0\0L4H�S�_@\��v�$�@@',1,'제주특별자치도 서귀포시','9b4a51b8-6010-42b0-af3e-21de8a996429.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/9b4a51b8-6010-42b0-af3e-21de8a996429.jpg','제주 야자수 가로수','대접.한방.사용법',15),(50,'2023-02-15 17:02:57','2023-02-15 17:02:57','하늘 색깔이 너무 예쁘고 달이 너무 예쁘게 떠있네요~',_binary '\0\0\0\0\0\0\0\�\�\�I\'�_@YR\�>ǹ@@',1,'제주특별자치도 제주시','c77d4aef-0ab3-4ef9-877e-cb8047026714.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/c77d4aef-0ab3-4ef9-877e-cb8047026714.jpg','하늘보세요','해물찜.저것.녹음실',15),(51,'2023-02-15 17:03:19','2023-02-15 17:03:19','카페 앞에 나와 바다를 보았습니다 아름다운 바다를 보니 지나간 연인을 떠오르게 하네요... 아아 노스텔지아- 그리운 순간들을 넘어 도달한 이곳에는 무엇이 있을까요- 삶을 돌아보는 순간이었습니다.',_binary '\0\0\0\0\0\0\0\�+�z��_@��a�B@',1,'인천광역시','bbed8e24-2986-40d3-9a32-61bc04b22479.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/bbed8e24-2986-40d3-9a32-61bc04b22479.jpg','카페에서 보던 바다','몽상.조장.윤곽',18),(52,'2023-02-15 17:03:34','2023-02-15 17:03:34','Baby, got me looking so crazy\r\n빠져버리는 daydream\r\nGot me feeling you\r\n너도 말해줄래\r\n누가 내게 뭐라든\r\n남들과는 달라 넌\r\nMaybe you could be the one\r\n날 믿어봐 한번',_binary '\0\0\0\0\0\0\0�P\�\�\��_@�\�\��B@',1,'서울특별시',NULL,NULL,'오늘의 일기','주운.솜털.뮤직',5),(53,'2023-02-15 17:04:02','2023-02-15 17:04:02','제주 토박이가 부여에 놀러와서 예쁜 강도 보고가네요~',_binary '\0\0\0\0\0\0\0�7�\�d�_@�&�f%B@',1,'충청남도 부여군','aaa3d5c7-642f-4a28-b96a-4e5122b4281f.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/aaa3d5c7-642f-4a28-b96a-4e5122b4281f.jpg','부여에 놀러왔어요','속담.성능.창립',15);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_like`
--

DROP TABLE IF EXISTS `post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_like` (
  `post_like_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`post_like_id`),
  KEY `FKj7iy0k7n3d0vkh8o7ibjna884` (`post_id`),
  KEY `FKhuh7nn7libqf645su27ytx21m` (`user_id`),
  CONSTRAINT `FKhuh7nn7libqf645su27ytx21m` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKj7iy0k7n3d0vkh8o7ibjna884` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_like`
--

LOCK TABLES `post_like` WRITE;
/*!40000 ALTER TABLE `post_like` DISABLE KEYS */;
INSERT INTO `post_like` VALUES (1,'2023-02-15 14:35:15','2023-02-15 14:35:15',13,16),(2,'2023-02-15 14:35:26','2023-02-15 14:35:26',7,16),(3,'2023-02-15 14:39:07','2023-02-15 14:39:07',12,16),(4,'2023-02-15 14:39:10','2023-02-15 14:39:10',11,16),(5,'2023-02-15 14:39:12','2023-02-15 14:39:12',10,16),(6,'2023-02-15 14:39:14','2023-02-15 14:39:14',9,16),(7,'2023-02-15 14:39:17','2023-02-15 14:39:17',3,16),(8,'2023-02-15 14:39:19','2023-02-15 14:39:19',1,16),(9,'2023-02-15 15:12:37','2023-02-15 15:12:37',19,17),(10,'2023-02-15 15:12:39','2023-02-15 15:12:39',20,17),(11,'2023-02-15 15:12:40','2023-02-15 15:12:40',21,17),(12,'2023-02-15 15:12:40','2023-02-15 15:12:40',25,1),(13,'2023-02-15 15:12:42','2023-02-15 15:12:42',22,17),(14,'2023-02-15 15:12:43','2023-02-15 15:12:43',23,17),(15,'2023-02-15 15:12:44','2023-02-15 15:12:44',24,17),(16,'2023-02-15 15:12:46','2023-02-15 15:12:46',25,17),(17,'2023-02-15 15:12:47','2023-02-15 15:12:47',24,1),(18,'2023-02-15 15:13:02','2023-02-15 15:13:02',23,1),(19,'2023-02-15 15:13:06','2023-02-15 15:13:06',22,1),(20,'2023-02-15 15:13:09','2023-02-15 15:13:09',21,1),(21,'2023-02-15 15:13:14','2023-02-15 15:13:14',20,1),(22,'2023-02-15 15:13:40','2023-02-15 15:13:40',19,1),(23,'2023-02-15 15:13:45','2023-02-15 15:13:45',18,1),(24,'2023-02-15 15:13:46','2023-02-15 15:13:46',17,1),(25,'2023-02-15 15:13:50','2023-02-15 15:13:50',16,1),(26,'2023-02-15 15:13:52','2023-02-15 15:13:52',15,1),(27,'2023-02-15 15:13:55','2023-02-15 15:13:55',13,1),(29,'2023-02-15 15:14:06','2023-02-15 15:14:06',12,1),(30,'2023-02-15 15:14:09','2023-02-15 15:14:09',11,1),(31,'2023-02-15 15:14:11','2023-02-15 15:14:11',10,1),(32,'2023-02-15 15:14:14','2023-02-15 15:14:14',9,1),(33,'2023-02-15 15:14:16','2023-02-15 15:14:16',7,1),(34,'2023-02-15 15:14:18','2023-02-15 15:14:18',3,1),(35,'2023-02-15 15:14:20','2023-02-15 15:14:20',1,1),(36,'2023-02-15 15:15:33','2023-02-15 15:15:33',26,1),(37,'2023-02-15 15:16:38','2023-02-15 15:16:38',18,16),(38,'2023-02-15 15:16:42','2023-02-15 15:16:42',17,16),(39,'2023-02-15 15:16:47','2023-02-15 15:16:47',16,16),(40,'2023-02-15 15:16:56','2023-02-15 15:16:56',15,16),(41,'2023-02-15 15:45:11','2023-02-15 15:45:11',37,14),(42,'2023-02-15 16:34:07','2023-02-15 16:34:07',12,13),(43,'2023-02-15 16:34:09','2023-02-15 16:34:09',11,13),(44,'2023-02-15 17:00:42','2023-02-15 17:00:42',40,1);
/*!40000 ALTER TABLE `post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_comment`
--

DROP TABLE IF EXISTS `sub_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_comment` (
  `sub_comment_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `content` varchar(300) NOT NULL,
  `comment_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`sub_comment_id`),
  KEY `FKpyep9wrxv2s4lxgr14h715983` (`comment_id`),
  KEY `FKihy0jyhesieyafg9xde29r5rj` (`user_id`),
  CONSTRAINT `FKihy0jyhesieyafg9xde29r5rj` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKpyep9wrxv2s4lxgr14h715983` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_comment`
--

LOCK TABLES `sub_comment` WRITE;
/*!40000 ALTER TABLE `sub_comment` DISABLE KEYS */;
INSERT INTO `sub_comment` VALUES (1,'2023-02-15 15:15:12','2023-02-15 15:15:12','ㅜㅜㅜ 아직 0살 !!',1,1),(2,'2023-02-15 15:39:16','2023-02-15 15:39:16','같이가유~~~~~~~',2,17);
/*!40000 ALTER TABLE `sub_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_comment_like`
--

DROP TABLE IF EXISTS `sub_comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_comment_like` (
  `sub_comment_like_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `sub_comment_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`sub_comment_like_id`),
  KEY `FKhdw0q1kh9j5u3emmh4s0p3vl7` (`sub_comment_id`),
  KEY `FKb3mbr76y8yuqu7d1rjgm223sl` (`user_id`),
  CONSTRAINT `FKb3mbr76y8yuqu7d1rjgm223sl` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKhdw0q1kh9j5u3emmh4s0p3vl7` FOREIGN KEY (`sub_comment_id`) REFERENCES `sub_comment` (`sub_comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_comment_like`
--

LOCK TABLES `sub_comment_like` WRITE;
/*!40000 ALTER TABLE `sub_comment_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tier`
--

DROP TABLE IF EXISTS `tier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tier` (
  `tier_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `tier_name` varchar(255) NOT NULL,
  PRIMARY KEY (`tier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tier`
--

LOCK TABLES `tier` WRITE;
/*!40000 ALTER TABLE `tier` DISABLE KEYS */;
/*!40000 ALTER TABLE `tier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `exp` int DEFAULT '0',
  `introduce` varchar(255) DEFAULT NULL,
  `level` int DEFAULT '1',
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo_name` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `tier_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKdqifi88g1aj7o8u3rkftgud10` (`tier_id`),
  CONSTRAINT `FKdqifi88g1aj7o8u3rkftgud10` FOREIGN KEY (`tier_id`) REFERENCES `tier` (`tier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-02-15 12:28:34','2023-02-15 16:01:07','thomazkwon@gmail.com',31,'hihihihi',1,'teq','$2a$10$dgS8p.evYyG8Mc.7vd26NuvVI6IzrP/WdOwLaBySBWxa9N9e04qWu','15af6925-28df-4c38-a43f-64a8f337714c.png','https://s3.ap-northeast-2.amazonaws.com/bucket305/15af6925-28df-4c38-a43f-64a8f337714c.png',NULL,'USER',NULL),(2,'2023-02-15 12:32:27','2023-02-15 13:17:49','myungho96@naver.com',0,'안녕하세요 여행을 좋아하는 명호킴입니다!',1,'명호킴','$2a$10$VKz7WIsTNa4.HoxLvDDL8OMfcLheuA8MgqrglbSJG92DIYhH0Nrr6','ad1e0386-eb40-4ab7-bdcf-28fa237ae231.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/ad1e0386-eb40-4ab7-bdcf-28fa237ae231.jpg','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0MzQ2NjgsImV4cCI6MTY3NzAzOTQ2OH0.FspPKOvmSLu0IpLmYWPRHtvyapOHXa_FbmqwVvfFBtw','USER',NULL),(4,'2023-02-15 12:39:45','2023-02-15 16:28:30','nayeon@ssafy.com',0,'호호호호',1,'나연','$2a$10$Hrq7q9OGuS6PB4G1y.H/mu7hmoxUwtNPR5NScnCzGNkb.XWyydmzK','32b1f751-ea80-4152-be0a-0c9478a03654.png','https://s3.ap-northeast-2.amazonaws.com/bucket305/32b1f751-ea80-4152-be0a-0c9478a03654.png','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDYxMTAsImV4cCI6MTY3NzA1MDkxMH0.xThAgpruhqe7TR_kLsD7eJsU2GzTYq_uWSSgKKskZ_k','USER',NULL),(5,'2023-02-15 12:42:08','2023-02-15 16:54:49','hama@ssafy.com',0,'호호호호',1,'물뚱뚱이','$2a$10$bADMyoMRCBWxZdyhUi2kTuismRVhfgtfatN09DlPTOWn7aU3B9Ru.',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDc2ODksImV4cCI6MTY3NzA1MjQ4OX0.ZsTPLBhhkSj-JeV3tfxcXX3Bp6j6wDSOGdiqDvRjj_c','USER',NULL),(6,'2023-02-15 12:42:43','2023-02-15 14:47:59','myungho96@nate.com',0,'노는게 제일 좋아',1,'MHO','$2a$10$s10nAQ.y32Cm1mOzZwRdWueU5Valm6g7J7BGtwKueQcaEfFl6XX0S',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDAwNzksImV4cCI6MTY3NzA0NDg3OX0.DhdYHCBdZq8l75LUvIBE45kY1hC0BV13ZSDlRbpN-5w','USER',NULL),(7,'2023-02-15 12:45:53','2023-02-15 14:27:18','ssafy@ssafy.com',0,'테스트계정',1,'테스트계정','$2a$10$dHnsvfSzyG92yk6MKpgJNOoP1qjTOfRb7zNCxQrqQtMmmcjq5GM8i','f73aa04e-f1f6-4ff3-a7c6-63c393c1c7a2.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/f73aa04e-f1f6-4ff3-a7c6-63c393c1c7a2.jpg','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0Mzg4MzcsImV4cCI6MTY3NzA0MzYzN30.ZUzopFM9ZBkGmeFhjocO3hBj1YVqNyh0oCvIJjgAdro','USER',NULL),(9,'2023-02-15 12:54:06','2023-02-15 17:07:23','gittgi768@gmail.com',0,'깃기 부캐입니다~~',1,'깃기 부캐','$2a$10$dqaZZuy90Cmp6tVlIehms.oWEb9T//fd4c1X7O.5dO8.M.zfGc6mO','0b216e43-e82c-4703-b4f1-60571f78f3bb.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/0b216e43-e82c-4703-b4f1-60571f78f3bb.jpg','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDg0NDIsImV4cCI6MTY3NzA1MzI0Mn0.X9hYTKOYk0HE77g2jbysXFZmp4riqU3owIKYhG7U32M','USER',NULL),(10,'2023-02-15 13:08:19','2023-02-15 16:36:18','kdoubleh22@naver.com',0,'',1,'doubleH','$2a$10$TuvaQA25YH/hdqONQD1LPOiVa9ECljOyFhqp1hYqmSsEO31QMGREa',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDY1NzcsImV4cCI6MTY3NzA1MTM3N30.bpvp3361BmQJkZhzMSAFlsLRJvyShwh_QfzQr2mmuOs','USER',NULL),(11,'2023-02-15 13:41:48','2023-02-15 17:08:25','ssafy1@ssafy.com',0,'망원동 좋아요~!',1,'망원동보안관','$2a$10$eOqa2ffcYQc/SRzOgfzT4uNAVMh4rYmNxkNSkCa4vDZ6q6xxlvmui','950a1bad-47b7-4d34-8563-0dd39b4a1036.png','https://s3.ap-northeast-2.amazonaws.com/bucket305/950a1bad-47b7-4d34-8563-0dd39b4a1036.png','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDg1MDQsImV4cCI6MTY3NzA1MzMwNH0.ZfV4BiYBx8gmpTbWnpJvEuw2wexAmLqSTMsYXFIf1cA','USER',NULL),(12,'2023-02-15 13:43:02','2023-02-15 13:43:02','ssafy2@ssafy.com',0,'피톤치드 맞으며 같이 힐링해요)))',1,'산이거기있었다','$2a$10$y4/NRNYBDtq1zAEo.XN/K.G4kni246iJ1sW1CaQUDdw3qdzSUUCW2',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0MzYxODEsImV4cCI6MTY3NzA0MDk4MX0.Mx0RjM_kq5v1KtNdI2yynWb67o-Qy81moTjXT2DOWFk','USER',NULL),(13,'2023-02-15 13:44:11','2023-02-15 16:26:36','ssafy3@ssafy.com',0,'',1,'맛집레츠고','$2a$10$O8aPugb7iffO3XSb6KHsCuIrmvb3STDy4EicTGo8k1SIEW/TTr2e2',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDU5OTUsImV4cCI6MTY3NzA1MDc5NX0.aU3-nEVPPthCdKB1jkSRFKFX13XYcQD9RnbWkgS7Szw','USER',NULL),(14,'2023-02-15 14:05:51','2023-02-15 16:49:48','silverain_9@naver.com',0,'민레집사입니다',1,'민레','$2a$10$nZKvs1lqw5XCG.2FlFfEu.jjJmI/qn9MEQxc5vn0T74FOoArVbXu2','6f2479bf-5173-42d5-ad2f-3c7542e30d1a.jpeg','https://s3.ap-northeast-2.amazonaws.com/bucket305/6f2479bf-5173-42d5-ad2f-3c7542e30d1a.jpeg','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDczODcsImV4cCI6MTY3NzA1MjE4N30.95KrAKftIITzxvbeZkYlvBwssok-YV2VlJXqUJL1js0','USER',NULL),(15,'2023-02-15 14:06:31','2023-02-15 16:56:23','hhssafy1@ssafy.com',0,'안녕하세요~ 제주도 토박이입니다.',1,'제주도토박','$2a$10$vrq0AtOEhflBhoMWOt.ZCuOmSRoqXT9b5kTgm4DSOKhMrwWYoZxw.',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDc3ODIsImV4cCI6MTY3NzA1MjU4Mn0.5tLC_Tt9yinRul5NFUYlJHxkGPe619jJCfHuzH2Y_S8','USER',NULL),(16,'2023-02-15 14:29:18','2023-02-15 16:04:51','dolpong@ssafy.com',0,'여수 여행 가기 전에 제 탐험 스윽 둘러보고가세요^0^',1,'여수맛집담당돌퐁','$2a$10$8iktA40YlN4aH2naCQ.Cse1DX6VFDyIe1mPPXR/.UF4m0shZLG5Om','046732cd-4696-475b-8351-96bed8c02c94.png','https://s3.ap-northeast-2.amazonaws.com/bucket305/046732cd-4696-475b-8351-96bed8c02c94.png','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDQ2OTEsImV4cCI6MTY3NzA0OTQ5MX0.DnedNo9WRBpwe3koBMm_wM66Xu5mnp4xEpeVfhrMQcc','USER',NULL),(17,'2023-02-15 14:31:53','2023-02-15 16:35:32','hhssafy2@ssafy.com',0,'좋은 여행지 있으면 공유해봐요~ 맞팔환영^^',1,'여행가김씨\n','$2a$10$0kyHYfWaKdInpMYTxKqqHOcjc/UQLH3wSylkrLEFHH9U80AtqANSO','38bc3637-903e-400d-a405-920e0bccb483.jpg','https://s3.ap-northeast-2.amazonaws.com/bucket305/38bc3637-903e-400d-a405-920e0bccb483.jpg','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDY1MzIsImV4cCI6MTY3NzA1MTMzMn0.u2rxgg4o6Rs6XNY5-e3406Q0nbAQUYUrN-xVset4YP4','USER',NULL),(18,'2023-02-15 15:47:41','2023-02-15 16:52:33','ssafy4@ssafy.com',0,'',1,'일상을여행처럼','$2a$10$XNHy7DqUmEdp8PJIVwmyB.bXZLiiDU7QVzLE3m.goX4/7lEgdtFIa',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDc1NTIsImV4cCI6MTY3NzA1MjM1Mn0.T-sLv9TIRoeFmeX3vuczvA3-YWmh3EMYz8-yYNskODc','USER',NULL),(19,'2023-02-15 16:55:35','2023-02-15 17:05:04','hhssafy3@ssafy.com',0,'혼자 뛰걸 즐기는 러너 현효입니다.',1,'나혼자뛴다','$2a$10$afwVn2hs8YaGsgI/9diY3ebceIrib/n8Hho35LedniLj4OqpSb7dy',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzY0NDgzMDMsImV4cCI6MTY3NzA1MzEwM30.DfN6gf0ucQrcw2goKEnhvdQ977FOgc2_RXaHbasm61g','USER',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 17:21:01
```

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
