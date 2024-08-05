pipeline {
    agent any

    stages {
        stage('Build Backend with Maven') {
            steps {
                dir('dataCentralizationProject') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'sonarscanner'
                    withSonarQubeEnv('sonarserver') {
                        bat "${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=dataCentralization -Dsonar.java.binaries=target/classes"
                    }
                }
            }
        }

        stage('Build and Run with Docker Compose') {
            steps {
                bat 'docker-compose up --build -d'
            }
        }
    }
}
