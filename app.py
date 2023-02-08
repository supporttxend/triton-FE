from flask import Flask,request
import mysql.connector
import json
app = Flask(__name__) #creating the Flask class object   



mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password=""
)
# mycursor = mydb.cursor()

 
@app.route('/') #decorator drfines the   
def main():
    if(mydb):
        return{
            "message":"SQL Connection Created Successfully",
            "status":200
        }
    else:
        return {
            "message":"Error",
            "status":409
        }

@app.route('/file', methods = ['POST']) #decorator drfines the   
def fileUpload():
    if request.method == 'POST':
      f = request.files['file']
      file = f.stream.read()
      datas = file.decode('utf-8')
      data = json.loads(datas)
      print('data ----->', data)
      return 'file uploaded successfully'

if __name__ =='__main__':  
    app.run(debug = True,port=2000) 