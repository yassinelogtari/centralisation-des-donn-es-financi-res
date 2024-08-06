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
                        bat """
                        ${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=dataCentralization -Dsonar.java.binaries=.
                        """
                    }
                }
            }
        }

        stage('Build and Run with Docker Compose') {
            steps {
                script {
                    
                    def containerName = 'datacentralization'
                
                    bat 'docker-compose up --build -d'
                    
                     bat "docker rename \$(docker ps -q -l) ${containerName}"
                }
            }
        }
    }
}
