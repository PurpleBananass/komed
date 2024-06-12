from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    response = f"Server received: {message}"
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
