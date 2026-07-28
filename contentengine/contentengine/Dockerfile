FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy the entire Maven project
COPY . .

# Build the application
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 9093

ENTRYPOINT ["java", "-jar", "app.jar"]
