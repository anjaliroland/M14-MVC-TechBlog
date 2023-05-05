const sequelize = require('../config/connection');
const seedUser = require('./userSeeds');
const seedPost = require('./postSeeds');
const seedCommment = require('./commentSeeds');

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedUser();

    await seedPost();
    
    await seedCommment();

    process.exit(0);
};

seedAll();