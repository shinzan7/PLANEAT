FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE=./backend/build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 9000
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul","/app.jar"]