const knex = require('knex')(require('./knexfile'));

module.exports = {
    createSubscription({email, city}) {
      console.log(`Add user ${email} with location: ${city}`);
      return knex('Subscription').insert({email, city})
    },

    isUserAlreadySubscribed(email) {
        return knex('Subscription').where({
            email: email
        }).select('email')
    },

    getAllSubs() {
        return knex('Subscription').finally(() => {
            knex.destroy();
        });
    }
}