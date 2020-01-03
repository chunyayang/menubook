const jsonStores = require("./stores.json");
const jsonMenus = require("./menus.json");

export default {
  create: () => ({
    get: path => {
      const found = path.match(/[^/]\w+|\d+/g);
      const resource = found[0];
      const id = found.length > 1 ? found[1] : null;
      let data = null;

      if(resource === "stores") {
        data = id ? jsonStores.stores[id - 1] : jsonStores.stores;
      }
      else if(resource === "menus") {
        data = jsonMenus.menus[id - 1];
      }

      return Promise.resolve({ data: data });
  }})
}
