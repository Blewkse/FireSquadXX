import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/GenerateMap", "MapGeneratorsController.generateMap");
}).prefix("api/maps");

module.exports = Route;
