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
                    bat 'docker-compose up --build -d'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    def imageName = 'logtari31/datacentralisationpipeline'
                    def imageTag = 'latest'

                    bat "docker login -u logtari31 -p Bq#NstR53vwt,m]"
                    // You can tag the image with a new name if needed
                    bat "docker tag ${imageName}:${imageTag} ${imageName}:${imageTag}"
                    bat "docker push ${imageName}:${imageTag}"
                }
            }
        }
    }
}
