module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "25m",
      },
    },
  },
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: "pawel.sluzbowy@interia.pl",
        defaultReplyTo: "pawel.sluzbowy@interia.pl",
        testAddress: 'pawel.sluzbowy@interia.pl',
      },
    },
  },
});
