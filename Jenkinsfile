pipeline {
    agent any
    
     environment {
        DOCKER_REPO = 'ayaribechir/devopspfe'
        DOCKER_IMAGE_TAG = 'latest'
        CHROME_BIN = '/usr/bin/google-chrome' 
        SCANNER_HOME=tool 'sonar-scanner'
    }
    
    stages {
        stage('checkout Code') {
            steps {
                echo 'PFE job pipeline'
                checkout([$class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[url: 'https://github.com/BchirAyari/cicdpipeline.git']]
                ])
            }
        }
        stage('Install Dependencies') {
            steps {
                // Assurez-vous que Node.js et npm sont installés sur l'agent Jenkins
                sh 'npm install'
            }
        }
        stage('Trivy FS Scan') {
            steps {
                sh "trivy fs . --format table -o /tmp/fs-report.html"
            }
        }
        stage('SonarQube Analysis') {
            steps {
                    withSonarQubeEnv('sonarqube') {
                        sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=capgemini \
                        -Dsonar.java.binaries=. \
                        -Dsonar.projectKey=capgemini '''
                    }
                }
        }
        stage('Build') { 
            steps {
                //sh 'npm install -g @angular/cli'
                sh './node_modules/.bin/ng build'
            }
        }
        stage('Unit Test') { // Renommé de 'test' à 'Test' pour suivre les conventions de casse
            steps {
                sh './node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless'
            }
        }
        stage('Quality analysis') {
            steps {
               // sh 'ng add @angular-eslint/schematics'
                sh './node_modules/.bin/ng lint'
            }
        }
        stage('Build Docker Image'){
            steps{
                sh 'docker build -t ${DOCKER_REPO}:${DOCKER_IMAGE_TAG} .'
            }
        }
        stage('Docker Image Scan'){
            steps{
                sh 'trivy image --timeout 60m --output /var/lib/jenkins/workspace/CI_PIPELINE_PROD/trivy-fs-report.txt ${DOCKER_REPO}:${DOCKER_IMAGE_TAG}'
            }
        }
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Login to Docker Hub
                        sh 'docker login -u "$DOCKERHUB_USERNAME" -p "$DOCKERHUB_PASSWORD"'

                        // Tag the Docker image (only if necessary)
                        // sh 'docker tag ${DOCKER_REPO}:${DOCKER_IMAGE_TAG} ${DOCKER_REPO}:${DOCKER_IMAGE_TAG}'

                        // Push the Docker image
                        sh 'docker push ${DOCKER_REPO}:${DOCKER_IMAGE_TAG}'

                        // Logout from Docker Hub
                        sh 'docker logout'
                    }
                }
            }
        }
        stage('Send Trivy Report'){
        steps {
        	always{
        		emailext(
        			subject: 'Trivy Security Scan Report',
        			body: 'Please find attached the Trivy security scan report',
        			attachmentsPattern: '/var/lib/jenkins/workspace/CI_PIPELINE_PROD/trivy-fs-report.txt',
        			to: "bechirthethe@gmail.com",
        			from: "jenkins@example.com",
        			replyTo: "jenkins@example.com"
        		)
             }
          }
        }
        stage('Trigger CD Pipeline') {
           steps {
               build job : "CD_PIPELINE_PROD" , wait:true
            }
        }
         stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'aks-capgemini', contextName: '', credentialsId: 'K8s_credential', namespace: 'prod', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.49.2:8443') {
                     sh "kubectl apply -f capgemini-app-deployment.yml -n prod"
                    }
               }
            }
            stage('Verify the Deployment') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'aks-capgemini', contextName: '', credentialsId: 'K8s_credential', namespace: 'prod', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.49.2:8443') {
                    sh "kubectl get pods -n prod"
                    sh "kubectl get svc -n prod"
                    }
                }
            }
    }
}