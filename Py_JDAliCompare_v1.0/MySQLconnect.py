import pymysql as sql
from flask import request, Flask, jsonify
from flask_cors import CORS
import time as t

app = Flask(__name__)
#  动态解决前端跨域问题
CORS(app, supports_credentials=True)


@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        # 处理OPTIONS请求，并返回正确的CORS头
        response = jsonify({'message': 'CORS preflight request handled successfully.'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print(data)
    # 建立数据库连接
    connection = sql.connect(
        host="localhost",
        user="root",
        password="2Weiayou!",
        database="firstproject"
    )
    res = ""
    try:

        with connection.cursor() as cursor:
            # SQL查询
            account = data["username"]
            code = data["password"]
            query = "SELECT * FROM accountinfo WHERE account=%s AND code=%s"
            a = cursor.execute(query, (account, code))
            print(a)

            # 获取查询结果
            result = cursor.fetchall()

            if len(result) > 0:
                res = jsonify({'success': True})
            else:
                res = jsonify({'success': False})

    except sql.Error as err:
        print("数据库错误：", err)
        res = jsonify({'success': False})

    finally:
        return res


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    # with open("E:/Desktop/j.json", 'w') as file:
    #     j.dump(data, file)
    print(data)
    # 建立数据库连接
    connection = sql.connect(
        host="localhost",
        user="root",
        password="2Weiayou!",
        database="firstproject"
    )
    res = ""
    try:

        with connection.cursor() as cursor:
            # SQL查询
            name = data["name"]
            account = data["username"]
            code = data["code"]
            gender = data["gender"]
            email = data["email"]
            age = data["age"]
            degree = data["degree"]
            current_time = t.localtime()
            time = t.strftime("%Y/%m/%d %H:%M:%S", current_time)
            print(time)
            query1 = "INSERT INTO accountinfo (username, account, code) VALUES(%s, %s, %s)"
            query2 = "INSERT INTO userinfo (Name, Gender, Email, Age, EduDegree, RegisterTime)\
             VALUES(%s, %s, %s, %s, %s, %s)"
            query3 = "SELECT * FROM userinfo WHERE Name=%s"
            a = cursor.execute(query1, (name, account, code))
            b = cursor.execute(query2, (name, gender, email, age, degree, time))
            c = cursor.execute(query3, name)
            connection.commit()
            print(a, b, c)

            # 获取查询结果
            result = cursor.fetchall()
            print(result)

            if len(result) > 0:
                res = jsonify({'success': True})
            else:
                res = jsonify({'success': False})

    except sql.Error as err:
        print("数据库错误：", err)
        res = jsonify({'success': False})

    finally:
        return res


def disconnect(connection):
    # 关闭连接
    if connection and connection.open:
        connection.close()
        print("MySQL数据库连接已关闭")


if __name__ == "__main__":
    #  指定端口号和地址
    app.run(debug=True)
