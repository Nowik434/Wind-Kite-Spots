module.exports = {
  async execute() {
    console.log("kkkkkkk", spot);
    const expiredSpots = await strapi.query("spots").find({
      "attributes.activeUsers.timestamp": { lt: new Date() },
    });

    expiredSpots.forEach(async (spot) => {
      const updatedAttributes = spot.attributes.activeUsers.filter(
        (user) => user.date >= new Date()
      );

      await strapi
        .query("spots")
        .update(
          { id: spot.id },
          { attributes: { activeUsers: updatedAttributes } }
        );
    });
  },
};
