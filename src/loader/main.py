import logging
import requests
import os, time, sys

NAMESPACE = os.environ.get("APP_NAMESPACE", "app")

logging.basicConfig(format='%(asctime)s %(levelname)s - %(message)s', stream=sys.stdout)

def main():
    while True:
        try:
            response = requests.get(f"http://operate.{NAMESPACE}/").json()
            print(response)
            logging.info(response)
        except:
            print("No se pudo obtener la operación")
            logging.error("No se pudo obtener la operación")

        time.sleep(0.5)

if __name__ == '__main__':
    main()


