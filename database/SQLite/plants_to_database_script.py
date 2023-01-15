import glob
import json
import sqlite3


def questionmarks(n: int):
    "Returns n question marks separated by commas"
    return ','.join('?' * n)


def main(conn: sqlite3.Connection):
    # możliwość edycji bazy danych
    cursor = conn.cursor()

    # pobranie poleceń tworzących bazę (z zapisanego pliku)
    with open("create_database.sql") as f:
        sql_table_creation = f.read()

    # utworzenie tabel w bazie
    cursor.executescript(sql_table_creation)

    # przechodzenie po plikach json
    for file in glob.glob("../plants/*.json"):
        with open(file) as f:
            file_contents = f.read()

        # przepisanie zawartości pliku na zrozumiałego programistycznie jsona
        file_json = json.loads(file_contents)
        # konstrukcja polecenia do bazy
        insert = f'''
                    INSERT INTO plants
                    VALUES ({questionmarks(25)})
                '''
        # wywołanie polecenia do bazy
        cursor.execute(insert, (file_json['pid'],
                                file_json['basic']['floral_language'], file_json['basic']['origin'],
                                file_json['basic']['production'], file_json['basic']['category'],
                                file_json['basic']['blooming'], file_json['basic']['color'],
                                file_json['display_pid'],
                                file_json['maintenance']['size'], file_json['maintenance']['soil'],
                                file_json['maintenance']['sunlight'], file_json['maintenance']['watering'],
                                file_json['maintenance']['fertilization'], file_json['maintenance']['pruning'],
                                file_json['parameter']['max_light_lux'], file_json['parameter']['min_light_lux'],
                                file_json['parameter']['max_temp'], file_json['parameter']['min_temp'],
                                file_json['parameter']['max_env_humid'], file_json['parameter']['min_env_humid'],
                                file_json['parameter']['max_soil_moist'], file_json['parameter']['min_soil_moist'],
                                file_json['parameter']['max_soil_ec'], file_json['parameter']['min_soil_ec'],
                                file_json['image']))


if __name__ == '__main__':
    with sqlite3.connect("plants.db") as sql:
        main(sql)
