import string
import random
import time
from math import sin

from flask import Flask, Response, request
from flask.json import jsonify
app = Flask(__name__)


def work(mu: float, sigma: float) -> None:
    # simulate work being done
    time.sleep(max(0.0, random.normalvariate(mu, sigma)))


@app.route('/')
def root():

    work(0.01,0.001)

    try:
        num_a = int(request.args.get('num_a'))
        num_b = int(request.args.get('num_b'))
        operand = request.args.get('operand')
        print(f"{num_a}{operand}{num_b}")
    except:
        return None
    
    calc = None
    if operand == 'sum': 
        calc = num_a+num_b
    elif operand == 'res':
        calc = num_a-num_b
    elif operand == 'prod':
        calc = num_a*num_b
    elif operand == 'div':
        calc = num_a/num_b

    return f"{calc}"


if __name__ == '__main__':
    app.run()