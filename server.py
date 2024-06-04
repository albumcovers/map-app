"""

    This is a development server just so I
    monitor changes to index.html

    This is just for development not for prod

"""

from flask import Flask, render_template

app = Flask()

app.get('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('localhost', port=8080, debug=True)
