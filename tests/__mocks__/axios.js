const jsonStores = require("./stores.json");
const jsonMenus = require("./menus.json");

export default {
  create: () => ({
    get: path => {
      const found = path.match(/[^/]\w+|\d+/g);
      const resource = found[0];
      const id = found.length > 1 ? found[1] : null;
      let data = null;

      switch (resource) {
        case "stores":
          if (id === null) {
            data = jsonStores.stores;
          }
          else if (id <= jsonStores.stores.length) {
            data = jsonStores.stores[id - 1];
          }
          break;
        case "menus":
          if (id && id <= jsonMenus.menus.length) {
            data = jsonMenus.menus[id - 1];
          }
          break;
        default:
          data = null;
      }
      
      if (!data) {
        return Promise.reject(new Error("Not Found"));
      }
      return Promise.resolve({ data: data });
    }
  })
}
