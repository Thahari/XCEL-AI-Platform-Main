from logging import root
import pymysql

# Database Configuration
DB_USERNAME = 'root'
DB_PASSWORD = 'haritha'
DB_HOST = '127.0.0.1'
DB_NAME = 'xcel_ai_platform'

# Connect to the database
connection = pymysql.connect(
    host=DB_HOST,
    user=DB_USERNAME,
    password=DB_PASSWORD,
    database=DB_NAME
)

try:
    with connection.cursor() as cursor:
        # Execute a query to check if the 'users' table exists
        cursor.execute("SHOW TABLES LIKE 'users';")
        result = cursor.fetchone()
        if result:
            print("The 'users' table exists in the database.")
        else:
            print("The 'users' table does not exist in the database.")
finally:
    connection.close()
