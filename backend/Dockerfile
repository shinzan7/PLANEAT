FROM openjdk:11-jdk
ARG JAR_FILE=/var/jenkins_home/workspace/deploytest/backend/build/libs/planeat-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul","/app.jar"]