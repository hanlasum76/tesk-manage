# 일정관리

### 실행순서
1. npm install
2. npm run start

### 환경
 - node v18.17.0

### API LIST

 1. 일정 생성
```
curl --location --request POST 'localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{   
    "tit1le":"test",
    "user_id": "test@naver.com",
    "description": "testtesttesttext",
    "status": "Pending",
    "due_date": "2023-04-03 23:00:00"
}'
```

2. 일정 수정
```
curl --location --request PUT 'localhost:3000/tasks/1?user_id=test@naver.com' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"test1",
    "user_id": "test@naver.com",
    "description": "testtesttesttext",
    "status": "Pending",
    "due_date": "2023-04-03 23:00:00"
}'
```

3. 일정 삭제
```
curl --location --request DELETE 'localhost:3000/tasks/1?user_id=test@naver.com' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"test1",
    "user_id": "test@naver.com",
    "description": "testtesttesttext",
    "status": "Pending",
    "due_date": "2023-04-03 23:00:00"
}'
```

4. 일정 조회
```
curl --location --request GET 'localhost:3000/tasks?user_id=test@naver.com' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"test1",
    "user_id": "test@naver.com",
    "description": "testtesttesttext",
    "status": "Pending",
    "due_date": "2023-04-03 23:00:00"
}'
```