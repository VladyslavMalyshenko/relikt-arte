import requests


from ..core.config import settings
from .schemas import NovaPostArea, NovaPostCity, NovaPostWarehouse


class NovaPostAPIManager:
    @property
    def base_data(self):
        return {
            "apiKey": settings.nova_post.api_key,
            "calledMethod": "",
            "modelName": "AddressGeneral",
            "methodProperties": {},
        }

    def process_api_method(self, called_method, method_properties=None):
        base_data = self.base_data
        base_data["calledMethod"] = called_method
        if method_properties:
            base_data["methodProperties"] = method_properties
        response = requests.post(settings.nova_post.enter_url, json=base_data)
        return response.json()

    def get_areas(self) -> list[NovaPostArea]:
        areas_list = []
        response = self.process_api_method("getAreas")
        if response["success"]:
            for item in response["data"]:
                if item["Description"] != "АРК":
                    areas_list.append(
                        NovaPostArea(
                            ref=item["Ref"],
                            description=item["Description"] + " область",
                        )
                    )
        return areas_list

    def get_cities_by_area(self, area_ref: str) -> list[NovaPostCity]:
        cities_list = []
        response = self.process_api_method("getCities")
        if response["success"]:
            for item in response["data"]:
                if item["Area"] == area_ref:
                    cities_list.append(
                        NovaPostCity(
                            ref=item["Ref"],
                            description=item["Description"],
                            city_id=item["CityID"],
                            settlement_type=item["SettlementType"],
                            settlement_type_description=item[
                                "SettlementTypeDescription"
                            ],
                        )
                    )
        return cities_list

    def get_warehouses_by_city(self, city_ref: str) -> list[NovaPostWarehouse]:
        warehouses_list = []
        response = self.process_api_method(
            "getWarehouses",
            method_properties={
                "CityRef": city_ref,
            },
        )
        if response["success"]:
            for item in response["data"]:
                warehouses_list.append(
                    NovaPostWarehouse(
                        ref=item["Ref"],
                        description=item["Description"],
                        short_address=item["ShortAddress"],
                        type_of_warehouse=item["TypeOfWarehouse"],
                        phone=item["Phone"],
                        number=item["Number"],
                        total_max_weight_allowed=item["TotalMaxWeightAllowed"],
                        place_max_weight_allowed=item["PlaceMaxWeightAllowed"],
                        reception=item["Reception"],
                        city_description=item["CityDescription"],
                    )
                )
        return warehouses_list
