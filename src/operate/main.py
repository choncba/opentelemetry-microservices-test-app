import logging
import random
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
import requests
import os

NAMESPACE = os.environ.get("APP_NAMESPACE", "app")

app = FastAPI()

operands = {"sum":"+", "res":"-", "prod":"*", "div":"/"}

@app.get("/")
async def operate():
    try:
        number_a = requests.get(f"http://number-a.{NAMESPACE}/").text
        number_b = requests.get(f"http://number-b.{NAMESPACE}/").text
        operand = requests.get(f"http://operand.{NAMESPACE}/").text
        calc = requests.get(f"http://calc.{NAMESPACE}/",
                            params={
                                "num_a":number_a,
                                "num_b":number_b,
                                "operand":operand
                            }
                        ).text

        if calc is not None and calc.replace('.','',1).replace('-','',1).isdigit():
            return JSONResponse(status_code=200, content={"msg": f"{number_a} {operands[operand]} {number_b} = {calc}"})
        else:
            return JSONResponse(status_code=500, content={"msg":"wrong values"})
    
    except:
        return JSONResponse(status_code=404, content={"msg":"some service is down"})

@app.get("/random_status")
async def random_status(response: Response):
    response.status_code = random.choice([200, 200, 300, 400, 500])
    logging.error("random status")
    return {"path": "/random_status"}