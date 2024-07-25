FROM openjdk:17-jdk-alpine

# Copy the JAR file from the target directory to the app directory inside the container
COPY target/dataCentralizationProject-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8090

# Run the JAR file
CMD ["java", "-jar", "app.jar"]
