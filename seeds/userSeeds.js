const { User } = require('../models');

const userData = [
    {
        username: 'tedlasso',
        email: 'ted@lasso.com',
        password: 'password1234'
    },
    {
        username: 'rebeccawelton',
        email: 'rebecca@welton.com',
        password: 'password1234'
    },
    {
        username: 'coachbeard',
        email: 'coach@beard.com',
        password: 'password1234'
    },
    {
        username: 'keeleyjones',
        email: 'keeley@jones.com',
        password: 'password1234'
    },
    {
        username: 'trentcrimm',
        email: 'trent@crimm.com',
        password: 'password1234'
    },
    {
        username: 'jamietartt',
        email: 'jamie@tartt.com',
        password: 'password1234'
    },
    {
        username: 'samobisanya',
        email: 'sam@obisanya.com',
        password: 'password1234'
    },
    {
        username: 'roykent',
        email: 'roy@kent.com',
        password: 'password1234'
    },
    {
        username: 'danirojas',
        email: 'dani@rojas.com',
        password: 'password1234'
    },
    {
        username: 'issacmacadoo',
        email: 'issac@macadoo.com',
        password: 'password1234'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;