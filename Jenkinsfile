pipeline {
    agent any

    stages {
        stage('Build Backend with Maven') {
            steps {
                // Navigate to the backend directory and run Maven clean and package
                dir('dataCentralizationProject') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Build and Run with Docker Compose') {
            steps {
                // Run Docker Compose to build and start containers
                bat 'docker-compose up --build -d'
            }
        }
    }
}
