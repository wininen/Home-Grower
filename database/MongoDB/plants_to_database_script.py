import glob
import json


def main(result):
    # przechodzenie po plikach json
    for file in glob.glob("../../plants/*.json"):
        with open(file) as f:
            file_contents = f.read()

        # przepisanie zawartości pliku na zrozumiałego programistycznie jsona
        file_json = json.loads(file_contents)

        # wywołanie przepisywania do zbiorczego pliku
        result.write(file_contents)
    result.close()


if __name__ == '__main__':
    with open('onefilewithallplants.txt', 'w') as myfile:
        main(myfile)
