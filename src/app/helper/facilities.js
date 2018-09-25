import createEnum from "./create_enum";
import config from "../config";

export const FACILITIES = createEnum({
  WATER: "water",
  ELECTRICITY: "electricity",
  FURNISHED: "furnished",
  LAUNDRY: "laundry",
  PARKING: "parking",
  MOVING: "moving",
  STORAGE: "storage",
  CLEANING: "cleaning",
  GROCERIES: "groceries",
  MAINTENANCE: "maintenance",
  FURNITURE_RENT: "furniture rental",
  SECURITY: "security",
  GYM: "gym",
  POOL: "swimming pool",
  TENNIS: "tennis court",
  JACUZZI: "jacuzzi",
  PLAYGROUND: "playground",
  SAUNA: "sauna",
  SKY_GARDEN: "sky garden",
  TRACK: "running track",
  WIFI: "wifi",
  MICROWAVE: "microwave",
  OVEN: "oven",
  AC: "ac",
  STOVE: "stove",
  TV: "tv",
  WATER_HEATER: "water heater",
  BLENDER: "blender",
  IRON: "iron",
  WASHING_MACHINE: "washing machine",
  DISH_WASHER: "dish washer",
  FRIDGE: "fridge",
  WATER_DISPENSER: "water dispenser"
});

function getFacilityNameEn(facilityEnum) {
  switch (facilityEnum) {
    case FACILITIES.FURNISHED:
      return "Furnished Room";
    case FACILITIES.GROCERIES:
      return "Groceries";
    case FACILITIES.WATER:
      return "Water";
    case FACILITIES.WIFI:
      return "Wifi";
    case FACILITIES.STORAGE:
      return "Storage";
    case FACILITIES.PARKING:
      return "Parking";
    case FACILITIES.ELECTRICITY:
      return "Electricity";
    case FACILITIES.LAUNDRY:
      return "Laundry";
    case FACILITIES.CLEANING:
      return "House cleaning";
    case FACILITIES.MOVING:
      return "Moving";
    case FACILITIES.GYM:
      return "Gym";
    case FACILITIES.POOL:
      return "Swimming Pool";
    case FACILITIES.MAINTENANCE:
      return "Maintenance";
    case FACILITIES.FURNITURE_RENT:
      return "Furniture Rental";
    case FACILITIES.SECURITY:
      return "24/7 Security";
    case FACILITIES.TENNIS:
      return "Tennis";
    case FACILITIES.JACUZZI:
      return "Jacuzzi";
    case FACILITIES.PLAYGROUND:
      return "Playground";
    case FACILITIES.SAUNA:
      return "Sauna";
    case FACILITIES.SKY_GARDEN:
      return "Sky Garden";
    case FACILITIES.TRACK:
      return "Running Track";
    case FACILITIES.MICROWAVE:
      return "Microwave";
    case FACILITIES.OVEN:
      return "Oven";
    case FACILITIES.AC:
      return "Air Conditioner";
    case FACILITIES.STOVE:
      return "Stove";
    case FACILITIES.TV:
      return "TV";
    case FACILITIES.WATER_HEATER:
      return "Water Heater";
    case FACILITIES.BLENDER:
      return "Blender";
    case FACILITIES.IRON:
      return "Iron";
    case FACILITIES.WASHING_MACHINE:
      return "Washing Machine";
    case FACILITIES.DISH_WASHER:
      return "Dish Washer";
    case FACILITIES.FRIDGE:
      return "Refrigerator";
    case FACILITIES.WATER_DISPENSER:
      return "Water Dispenser";
    default: {
      if (config.isProd) {
        return "";
      }

      throw "Facility does not have a text";
    }
  }
}

export function getFacilityName(facilityEnum, language) {
  return getFacilityNameEn(facilityEnum);
}

export function getFacilityAsset(facilityEnum) {
  switch (facilityEnum) {
    case FACILITIES.FURNISHED:
      return require("../assets/facility/icon_bed.svg");
    case FACILITIES.GROCERIES:
      return require("../assets/facility/icon_groceries.svg");
    case FACILITIES.WATER:
      return require("../assets/facility/icon_water.svg");
    case FACILITIES.WIFI:
      return require("../assets/facility/icon_wifi.svg");
    case FACILITIES.STORAGE:
      return require("../assets/facility/icon_storage.svg");
    case FACILITIES.PARKING:
      return require("../assets/facility/icon_car.svg");
    case FACILITIES.ELECTRICITY:
      return require("../assets/facility/icon_electricity.svg");
    case FACILITIES.LAUNDRY:
      return require("../assets/facility/icon_laundry.svg");
    case FACILITIES.CLEANING:
      return require("../assets/facility/icon_clean.svg");
    case FACILITIES.MOVING:
      return require("../assets/facility/icon_moving.svg");
    case FACILITIES.GYM:
      return require("../assets/facility/icon_gym.svg");
    case FACILITIES.POOL:
      return require("../assets/facility/icon_pool.svg");
    case FACILITIES.MAINTENANCE:
      return require("../assets/facility/icon_repair.svg");
    case FACILITIES.FURNITURE_RENT:
      return require("../assets/facility/icon_rental.svg");
    case FACILITIES.SECURITY:
      return require("../assets/facility/icon_security.svg");
    case FACILITIES.TENNIS:
      return require("../assets/facility/icon_tennis.svg");
    case FACILITIES.JACUZZI:
      return require("../assets/facility/icon_jacuzzi.svg");
    case FACILITIES.PLAYGROUND:
      return require("../assets/facility/icon_playground.svg");
    case FACILITIES.SAUNA:
      return require("../assets/facility/icon_sauna.svg");
    case FACILITIES.SKY_GARDEN:
      return require("../assets/facility/icon_garden.svg");
    case FACILITIES.TRACK:
      return require("../assets/facility/icon_track.svg");
    case FACILITIES.MICROWAVE:
      return require("../assets/facility/icon_microwave.svg");
    case FACILITIES.OVEN:
      return require("../assets/facility/icon_oven.svg");
    case FACILITIES.AC:
      return require("../assets/facility/icon_ac.svg");
    case FACILITIES.STOVE:
      return require("../assets/facility/icon_stove.svg");
    case FACILITIES.TV:
      return require("../assets/facility/icon_tv.svg");
    case FACILITIES.WATER_HEATER:
      return require("../assets/facility/icon_heater.svg");
    case FACILITIES.BLENDER:
      return require("../assets/facility/icon_blender.svg");
    case FACILITIES.IRON:
      return require("../assets/facility/icon_iron.svg");
    case FACILITIES.WASHING_MACHINE:
      return require("../assets/facility/icon_washingmachine.svg");
    case FACILITIES.DISH_WASHER:
      return require("../assets/facility/icon_dishwasher.svg");
    case FACILITIES.FRIDGE:
      return require("../assets/facility/icon_fridge.svg");
    case FACILITIES.WATER_DISPENSER:
      return require("../assets/facility/icon_dispenser.svg");
    default: {
      if (config.isProd) {
        return require("../assets/facility/icon_water.svg");
      }

      throw "Facility does not have an asset";
    }
  }
}
