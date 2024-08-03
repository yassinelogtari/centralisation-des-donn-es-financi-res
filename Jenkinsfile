pipeline {
    agent any
    
    stages {
        stage('Build and Run with Docker Compose') {
            steps {
                bat 'docker-compose up --build '
            }
        }
    }
}
