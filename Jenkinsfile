pipeline{
    agent any
    satges{
        stage("verifing files"){
            steps:
            script{
                def files = [
                    'index.html'
                    'script.js'
                    'style.css'
                ]
                for (file in files){
                    sh "test -f '${file}' || echo 'error: ${file} is not found  '"
                }
                echo 'All Files Found!!'
            
            }
        }
    }
}