from flask import (
    render_template
)

from app import app


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/chat/<string:chat_id>', methods=['GET'])
def chat(chat_id):
    params = dict(
        chat_id=chat_id
    )

    return render_template('chat.html', **params)


@app.route('/subject/list', methods=['GET'])
def subject():
    # TODO
    return render_template('subject.html')
