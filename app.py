from flask import Flask,request
import mysql.connector
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


if __name__ =='__main__':  
    app.run(debug = True,port=2000) 