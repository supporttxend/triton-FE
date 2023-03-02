from flask import Flask,request
from flask_cors import CORS
import mysql.connector
import json
app = Flask(__name__) #creating the Flask class object   
cors = CORS(app, resources={r"/*": {"origins": "*"}})
from decouple import config
from datetime import datetime

HOST = config('HOST', str)
DATABASE = config('DATABASE', str)
USER = config('USER', str)
PORT = config("PORT", int)


mydb = mysql.connector.connect(
  host= HOST,
  user= USER,
  password="",
  database= DATABASE  
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
    processorType = data.get('processor')
    mycursor = mydb.cursor()
    sql = "INSERT INTO tbljob_inventory (Line_ID, Asset_ID, Ansible_Hostname, inventory_hostname, distribution, distribution_version, os_family, processor_type, processor_model ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (data.get('Line_ID'), 1, data.get('hostname'), data.get('inventory_hostname'), data.get('distribution'), data.get('distribution_version'), data.get('os_family'), processorType[1], processorType[2])
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

def formDataGet():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM tbljob_inventory")
    myresult = mycursor.fetchall()
    return myresult   

def updateAndCreate(id,data):
    mycursor = mydb.cursor()
    mycursor.execute(f'SELECT * FROM `tblassets` WHERE Asset_ID = {id}')
    myresult = mycursor.fetchone()
    if(myresult):
        now = datetime.now()
        dt_string = now.strftime("%Y-%d-%m %H:%M:%S")
        print(data.get('Asset_ID'), data.get('Enabled'), data.get('Asset_Name'), dt_string, id)
        mycursor = mydb.cursor()
        sql_update = "UPDATE tblassets SET Asset_ID=%s, Enabled=%s, Asset_Name=%s, Last_Update_Date=%s WHERE Asset_ID=%s"
        values = (data.get('Asset_ID'), data.get('Enabled'), data.get('Asset_Name'), dt_string, id)
        mycursor.execute(sql_update, values)
        mydb.commit()
        if(mycursor.rowcount):
            return{
            "message":"Data Updated Successfully",
            "status":200,
            }
        return{
            "message":"Error",
            "status":409
            }  
    mycursor = mydb.cursor()
    sql = "INSERT INTO tblassets (Asset_ID, Enabled, Asset_Name) VALUES (%s, %s, %s)"
    val = (data.get('Asset_ID'), data.get('Enabled'), data.get('Asset_Name')) 
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


@app.route('/inventory', methods = ['POST']) #decorator drfines the   
def updateInventory():
    if request.method == 'POST':
        data = json.loads(request.get_json(force=True))
        res = valuesGetting(data)
        return res


@app.route('/file', methods = ['POST']) #decorator drfines the   
def fileUpload():
    if request.method == 'POST':
      f = request.files['file']
      file = f.stream.read()
      datas = file.decode('utf-8')
      data = json.loads(datas)
      res = valuesGetting(data)
      return res

@app.route('/assit/<int:id>', methods = ['PUT']) #decorator drfines the   
def updateAsset(id):
    if request.method == 'PUT':
        data = request.get_json()
        res = updateAndCreate(id,data)
        return res



@app.route('/data', methods = ['GET']) #decorator drfines the   
def data():
      dist = []
      res = formDataGet()
      i=0
      while(i < len(res)):
        dist.append({"job_ID":res[i][0] if res[i][0] else 'null',"Line_ID":res[i][1] if res[i][1] else 'null',"Asset_ID":res[i][2] if res[i][2] else 'null', "Ansible_Hostname":res[i][3] if res[i][3] else 'null', "inventory_hostname":res[i][4] if res[i][4] else 'null', "distribution":res[i][5] if res[i][5] else 'null', "distribution_version":res[i][6] if res[i][6] else 'null', "os_family":res[i][7] if res[i][7] else 'null', "processor_type":res[i][8] if res[i][8] else 'null', "processor_model":res[i][9] if res[i][9] else 'null'})
        i+=1
      if(res):
            return{
            "message":"Data Found Successfully",
            "status":200,
            "data" : dist
            }
      return{
            "message":"Data not Found",
            "status":404
        }     
    #   return res

if __name__ =='__main__':  
    app.run(debug = True,port=PORT) 