/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'NeoByte_42',
      auth0sub: 'auth0|neo123456',
      phone: '+12223334444',
      credits: 1500.75,
      rating_received: 4.7,
      rating_given: 4.8,
      picture: 'https://example.com/images/neobyte.png'
    },
    {
      username: 'StellarNomad',
      auth0sub: 'auth0|stellar987654',
      phone: '+13334445555',
      credits: 2380.5,
      rating_received: 4.9,
      rating_given: 4.6,
      picture: 'https://example.com/images/stellarnomad.png'
    },
    {
      username: 'QuantumRanger',
      auth0sub: 'auth0|quantum0001',
      phone: '+14445556666',
      credits: 3050.3,
      rating_received: 4.6,
      rating_given: 4.7,
      picture: 'https://example.com/images/quantumranger.png'
    },
{
      username: 'GalacticSurge',
      auth0sub: 'auth0|galactic2222',
      phone: '+15556667777',
      credits: 1845.95,
      rating_received: 4.8,
      rating_given: 4.5,
      picture: 'https://example.com/images/galacticsurge.png'
    },
    {
      username: 'CryoBlaze',
      auth0sub: 'auth0|cryo3333',
      phone: '+16667778888',
      credits: 920.4,
      rating_received: 4.4,
      rating_given: 4.6,
      picture: 'https://example.com/images/cryoblaze.png'
    },
    {
      username: 'PlasmaWave',
      auth0sub: 'auth0|plasma4444',
      phone: '+17778889999',
      credits: 2500.15,
      rating_received: 4.7,
      rating_given: 4.9,
      picture: 'https://example.com/images/plasmawave.png'
    },
    {
      username: 'NovaDiver',
      auth0sub: 'auth0|nova5555',
      phone: '+18889990000',
      credits: 780.8,
      rating_received: 4.5,
      rating_given: 4.6,
      picture: 'https://example.com/images/novadiver.png'
    },
    {
      username: 'AetherBlade',
      auth0sub: 'auth0|aether6666',
      phone: '+19990001111',
      credits: 1250.5,
      rating_received: 4.6,
      rating_given: 4.8,
      picture: 'https://example.com/images/aetherblade.png'
    },
    {
      username: 'OrbitClasher',
      auth0sub: 'auth0|orbit7777',
      phone: '+20001112222',
      credits: 460.25,
      rating_received: 4.3,
      rating_given: 4.2,
      picture: 'https://example.com/images/orbitclasher.png'
    },
    {
      username: 'VoidVoyager',
      auth0sub: 'auth0|void8888',
      phone: '+21112223333',
      credits: 9999.99,
      rating_received: 5.0,
      rating_given: 4.9,
      picture: 'https://example.com/images/voidvoyager.png'
    }
  ])
};
