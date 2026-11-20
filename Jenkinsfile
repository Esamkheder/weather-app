pipeline{
    agent any
    stages{
        stage("verifing files"){
            steps{
                script{
                    def files = [
                        'index.html',
                         'script.js',
                         'style.css',
                         'app.yml'
                         ]
                     for (file in files){
                           sh "test -f '${file}' || ( echo 'error: ${file} is not found '; exit 1)"
                         }
                     echo 'All Files Found!!'
            
                }
            }

        }
        stage("create api secret"){
            steps{
                withCredentials([
                    file(
                        credentialsId: 'api-secret',
                        variable: 'api_secret_key'
                    )
                ]) {
                    
                    sh '''
                        set +x
                        kubectl apply -f "$secret.yml"
                    ''' 
                }
            }
        }
        stage("aplly deploy"){
            steps{
                sh 'kubectl apply -f app.yml'
            }
        }
    }
}