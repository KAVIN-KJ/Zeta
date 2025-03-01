import json
from flask import Flask,request,jsonify 
import subprocess
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app)


@app.route('/run',methods=['POST'])
def run():
    data = request.json
    code = data["code"]
    code_ip = data["input"]
    language = data["language"]
    filename = ""
    if language=="py":
        filename = "run.py"
    elif language=="java":
        filename = "run.java"
    elif language=="cpp":
        filename = "run.cpp"
        
    print("Request received\n",code,code_ip,filename)
    
    os.makedirs("./user-codes", exist_ok=True)
    
    file_path = f"./user-codes/{filename}"
    dir_path = "./user-codes"
    with open(file_path, "w") as file:
        file.write(code)    
    
    cmd = []
    
    if language=="py":
        cmd = ["python3",file_path]
        result = subprocess.run(cmd,
                                input=code_ip,
                                capture_output=True,
                                text=True,
                                timeout=5)
    
    elif language=="java":
        cmd = ["java",file_path]
        result = subprocess.run(cmd,
                                input=code_ip,
                                capture_output=True,
                                text=True,
                                timeout=5)
        
    elif language=="cpp":
        cmd = f"g++ {file_path} -o {dir_path}/a.out && {dir_path}/a.out"
        result = subprocess.run(cmd,
                                input=code_ip,
                                capture_output=True,
                                text=True,
                                shell=True,
                                timeout=5)
    output = result.stdout if result.returncode==0 else result.stderr
    
    return json.dumps({"output":output})



@app.route('/')
def root():
    return "The ROOT page !"

app.run()