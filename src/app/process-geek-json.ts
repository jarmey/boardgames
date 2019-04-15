export function  GeekJson(data) {

  let rawData = data.items.item;
  let processedData = [];
  for (let item of rawData) {
    let game = {
      'geekId' : item.$['objectid'],
      'name' : item.name[0]._,
      'image' : item.image[0],
      'thumbnail' : item.thumbnail[0],
      'players_min' : item.stats[0].$['minplayers'],
      'players_max' : item.stats[0].$['maxplayers'],
      'playtime_min' : item.stats[0].$['minplaytime'],
      'playtime_max' : item.stats[0].$['maxplaytime'],
      'rating_average' :  item.stats[0].rating[0].average[0].$['value'],
    };
    processedData.push(game);
  }
  //return rawData;
  return processedData;

}
