from flask import Flask,request
import mysql.connector
import json
app = Flask(__name__) #creating the Flask class object   



mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="flask"
)


 
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

def valuesGetting(data):
    mycursor = mydb.cursor()
    sql = "INSERT INTO tbljob_inventory (Line_ID, Asset_ID, Ansible_Hostname, inventory_hostname, distribution, distribution_version, os_family, processor_type, processor_model ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (data.get('Line_ID'), 1, data.get('Ansible_Hostname'), data.get('inventory_hostname'), data.get('distribution'), data.get('distribution_version'), data.get('os_family'), data.get('processor_type'), data.get('processor_model'))
    mycursor.execute(sql, val)
    mydb.commit()
    if(mycursor.rowcount):
        return{
            "message":"Data Inserted Successfully",
            "status":200,
        }
    return{
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
      res = valuesGetting(data)
      return res


if __name__ =='__main__':  
    app.run(debug = True,port=2000) 