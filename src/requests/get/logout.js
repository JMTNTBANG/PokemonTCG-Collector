module.exports = {
    init: (prefix, website) => {
      website.get(`${prefix}logout`, (request, response) => {
        request.session.poketcg = {
            authenticated: false,
            username: null,
            userid: null,
          };
        response.redirect("/")
      });
    },
  };
  