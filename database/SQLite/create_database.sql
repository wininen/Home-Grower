-- cat create_database.sql | sqlite3 plants.db
DROP TABLE IF EXISTS plants;
CREATE TABLE plants ( 
    id          TEXT NOT NULL UNIQUE,
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
    PRIMARY KEY("id")
);

DROP TABLE IF EXISTS myplants;
CREATE TABLE myplants(
    id              TEXT UNIQUE,
    photo_path      TEXT,
    plant_genus_id  TEXT,
    PRIMARY KEY("id"),
    FOREIGN KEY(plant_genus_id) REFERENCES plants(id)
);

DROP TABLE IF EXISTS reports;
CREATE TABLE reports(
    id          INTEGER NOT NULL UNIQUE,
    my_plant_id    TEXT,
    plant_genus_id TEXT,
    timestamp   DATETIME,
    light       INT,
    env_humid   INT,
    soil_moist  INT,
    soil_ec     INT,
    device_id   TEXT,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY(my_plant_id) REFERENCES myplants(id),
    FOREIGN KEY(plant_genus_id) REFERENCES plants(id)
    
);

DROP TABLE IF EXISTS myplantuser;
CREATE TABLE myplantuser(
    myplant_id  TEXT UNIQUE,
    user_id     TEXT,
    plant_name  TEXT,
    PRIMARY KEY("myplant_id","user_id"),
    FOREIGN KEY(myplant_id)      REFERENCES myplants(id),
    FOREIGN KEY(user_id)         REFERENCES user(id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user(
    id          TEXT UNIQUE,
    username    TEXT,
    PRIMARY KEY("id")
);