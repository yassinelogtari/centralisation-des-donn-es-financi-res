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

        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = 'logtari31/datacentralization'
                    def imageTag = 'latest'

                    // Build Docker image
                    bat "docker build -t ${imageName}:${imageTag} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    def imageName = 'logtari31/datacentralization'
                    def imageTag = 'latest'

                    // Login to Docker Hub and push the image
                    bat "docker login -u logtari31 -p Bq#NstR53vwt,m]"
                    bat "docker push ${imageName}:${imageTag}"
                }
            }
        }
    }
}
