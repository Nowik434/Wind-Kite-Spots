module.exports = {
  "* * * * *": async ({ strapi }) => {
    const expiredSpots = await strapi.db.query("api::spot.spot").findMany({
      select: ["activeUsers"],
    });

    expiredSpots.forEach(async (spot) => {
      console.log(spot);
      spot.activeUsers !== null &&
        spot.activeUsers.forEach(async (user) => {
          if (new Date(user.timestamp).valueOf() > new Date().valueOf()) {
            // console.log(user);
            return user;
          }
        });
    });

    await strapi.db
      .query("api::spot.spot")
      .update({ id: spot.id }, { activeUsers: spot.activeUsers });

    console.log("user removed", expiredSpots);
  },
};
