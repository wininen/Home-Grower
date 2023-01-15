-- 2 właścicieli, 2 raporty
-- 1 właściciel, 1 raport
-- 1 właściciel, 0 raportów

DELETE FROM myplants;
INSERT INTO myplants
VALUES  ('45ce2ccc-941f-11ed-a1eb-0242ac120002','aeonium decorum f. variegata'),
        ('a426577c-941f-11ed-a1eb-0242ac120002','polystichum spp.'),
        ('2dc09fbc-9423-11ed-bd52-12855d1c26f9',"spathiphyllum 'coco cupido'");

DELETE FROM reports;
INSERT INTO reports
VALUES  ('00000001-9420-21ed-ab00-12855d1c26f9','45ce2ccc-941f-11ed-a1eb-0242ac120002','aeonium decorum f. variegata','2023-01-14 16:00:24',400,200,300,160,22,'dev'),
        ('00000001-9420-21ed-bc00-12855d1c26f9','45ce2ccc-941f-11ed-a1eb-0242ac120002','aeonium decorum f. variegata','2023-01-14 13:03:20',450,250,250,100,23,'dev'),
        ('00000001-9420-21ed-aa00-12855d1c26f9','a426577c-941f-11ed-a1eb-0242ac120002','polystichum spp.','2022-12-30 16:00:24',600,600,600,600,19,'dev1');

DELETE FROM user;
INSERT INTO user
VALUES  ('3e2ee921-7312-45c1-a3aa-7e63813b95ae','Agata'),
        ('153ee14e-41c2-4bd5-bd52-39b9994e0e7b','Aleks');

DELETE FROM myplantuser;
INSERT INTO myplantuser
VALUES  ('45ce2ccc-941f-11ed-a1eb-0242ac120002','3e2ee921-7312-45c1-a3aa-7e63813b95ae','roślina Agaty'),
        ('45ce2ccc-941f-11ed-a1eb-0242ac120002','153ee14e-41c2-4bd5-bd52-39b9994e0e7b','roślina Agaty pod opieką Aleksa'),
        ('a426577c-941f-11ed-a1eb-0242ac120002','3e2ee921-7312-45c1-a3aa-7e63813b95ae','2. roślina Agaty'),
        ('2dc09fbc-9423-11ed-bd52-12855d1c26f9','153ee14e-41c2-4bd5-bd52-39b9994e0e7b','roślina Aleksa');
