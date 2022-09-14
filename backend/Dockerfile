# 1. 빌드용 이미지
FROM openjdk:11 AS build
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x gradlew
RUN ["./gradlew", "clean", "build", "--stacktrace", "--exclude-task", "test"]

# 2. 빌드 된 파일을 배포용 이미지에 복사
FROM openjdk:11-jre-slim
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT java -jar app.jar