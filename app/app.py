from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

#Configuração do SQL
db_config = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
    "port":int(os.getenv("DB_PORT", 3306))
}
print(os.getenv("DB_PORT"))
def get_connection():
    return mysql.connector.connect(**db_config)

try:
    connection = get_connection()
    print("Conexão estabelecida com sucesso!")
    connection.close()
except mysql.connector.Error as err:
    print(f"Erro ao conectar no banco: {err}")

@app.route('/')
def home():
    return jsonify({"message": "funfou"})

@app.route('/books', methods=["GET"])
def get_books():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM booksinfo")
        books = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(books)
    except mysql.connector.Error as err:
        print(f"Erro no MySQL: {err}")
        return jsonify({"error": str(err)}), 500

@app.route("/addbook", methods=["POST"])
def add_book():
    try:
        # Obtendo os dados enviados no corpo da requisição
        data = request.get_json()

        # Log para inspecionar os dados recebidos
        print("Dados recebidos:", data)

        # Verificando se os dados existem e se o bookName está presente
        if not data or not data.get('bookName'):
            return jsonify({"error": "bookName é obrigatório!"}), 400

        # Pegando os valores dos campos, usando None para os valores ausentes
        bookID = data.get('bookID')
        bookName = data.get('bookName')
        bookAuthor = data.get('bookAuthor')  # Pode ser None (null)
        bookPublishedYear = data.get('bookPublishedYear')  # Pode ser None (null)
        bookGenre = data.get('bookGenre')  # Pode ser None (null)
        bookEditionYear = data.get('bookEditionYear')  # Pode ser None (null)

        # Exibindo os valores no log
        print(f"bookName: {bookName}, bookAuthor: {bookAuthor}, bookPublishedYear: {bookPublishedYear}, bookGenre: {bookGenre}, bookEditionYear: {bookEditionYear}")

        # Conectando ao banco de dados
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Query de inserção no banco
        cursor.execute("""
            INSERT INTO booksinfo (bookID, bookName, bookAuthor, bookPublishedYear, bookGenre, bookEditionYear)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (bookID, bookName, bookAuthor, bookPublishedYear, bookGenre, bookEditionYear))

        # Commitando a transação no banco de dados
        connection.commit()

        # Fechando o cursor e a conexão
        cursor.close()
        connection.close()

        return jsonify({"message": "Livro adicionado com sucesso!"}), 201

    except mysql.connector.Error as err:
        print(f"Erro no MySQL: {err}")
        return jsonify({"error": "Erro ao acessar o banco de dados", "details": str(err)}), 500
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"error": "Erro desconhecido", "details": str(e)}), 500


@app.route("/deletebook", methods=["DELETE"])
def delete_book():
    try:
        # Pega os dados enviados pelo frontend (JSON)
        data = request.get_json()
        bookID = data.get("bookID")

        if not bookID:
            return jsonify({"error": "bookID é necessário"}), 400

        # Conectando ao banco de dados
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Executando o comando DELETE no banco de dados
        cursor.execute("DELETE FROM booksinfo WHERE bookID = %s", (bookID,))
        connection.commit()

        # Fechando conexão e cursor
        cursor.close()
        connection.close()

        # Retorna uma mensagem de sucesso
        return jsonify({"message": "Livro deletado com sucesso"})

    except mysql.connector.Error as err:
        print(f"Erro no MySQL: {err}")
        return jsonify({"error": "Erro ao acessar o banco de dados", "details": str(err)}), 500
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({"error": "Erro desconhecido", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

