pipeline{
    agent any
    stages{
        stage("verifing files"){
            steps{
                script{
                    def files = [
                        'index.html',
                         'script.js',
                         'style.css'
                         ]
                     for (file in files){
                           sh "test -f '${file}' || echo 'error: ${file} is not found '; exit 1;"
                         }
                     echo 'All Files Found!!'
            
                }
            }

        }
    }
}