-- cat create_database.sql | sqlite3 plants.db
DROP TABLE IF EXISTS plants;
CREATE TABLE plants ( 
    pid         TEXT NOT NULL UNIQUE,
    floral_language TEXT,   -- odpowiadający basic.floral_language
    origin      TEXT,       -- odpowiadający basic.origin
    production  TEXT,       -- odpowiadający basic.production
    category    TEXT,       -- odpowiadający basic.category
    blooming    TEXT,       -- odpowiadający basic.blooming
    color       TEXT,       -- odpowiadający basic.color
    display_pid TEXT,
    size        TEXT,
    soil        TEXT,
    sunlight    TEXT,
    watering    TEXT,
    fertilization   TEXT,
    pruning     TEXT,
    max_light_lux   INT,    -- odpowiadający parameter.max_light_lux
    min_light_lux   INT,    -- odpowiadający parameter.min_light_lux
    max_temp        INT,    -- odpowiadający parameter.max_temp
    min_temp        INT,    -- odpowiadający parameter.min_temp
    max_env_humid   INT,    -- odpowiadający parameter.max_env_humid
    min_env_humid   INT,    -- odpowiadający parameter.min_env_humid
    max_soil_moist  INT,    -- odpowiadający parameter.max_soil_moist
    min_soil_moist  INT,    -- odpowiadający parameter.min_soil_moist
    max_soil_ec     INT,    -- odpowiadający parameter.max_soil_ec
    min_soil_ec     INT,    -- odpowiadający parameter.min_soil_ec
    PRIMARY KEY("pid")
);

DROP TABLE IF EXISTS reports;
CREATE TABLE reports(
    id	INTEGER NOT NULL UNIQUE,
    timestamp   DATETIME,
    env_humid   INT,
    soil_moist  INT,
    soil_ec     INT,
    PRIMARY KEY("id" AUTOINCREMENT)
);

DROP TABLE IF EXISTS myplants;
CREATE TABLE myplants(
    photo_path      TEXT,
    my_plant_id     TEXT UNIQUE,
    my_plant_name   TEXT,
    plant_genus_id  INT,
    report_id       INT,
    PRIMARY KEY("my_plant_id"),
    FOREIGN KEY(report_id)      REFERENCES reports(id),
    FOREIGN KEY(plant_genus_id) REFERENCES plants(pid)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user(
    user_id         TEXT UNIQUE,
    myplant_id      INT,
    PRIMARY KEY("user_id"),
    FOREIGN KEY(myplant_id)      REFERENCES reports(id)
);

-- 1 do wielu dla rośliny - raporty 
-- nazwa my plants: osobna tabela id_usera + id_rośliny