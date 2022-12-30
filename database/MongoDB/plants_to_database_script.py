import glob
import json

DESTINATION = "one_file_with_all_plants.json"


def main():
    all_plants = []

    # przechodzenie po plikach json
    for file in glob.glob("../../plants/*.json"):
        with open(file) as f:
            plant = json.load(f)
        plant.pop('image')

        all_plants.append(plant)

    with open(DESTINATION, 'w') as f:
        json.dump(all_plants, f)


if __name__ == '__main__':
    main()
