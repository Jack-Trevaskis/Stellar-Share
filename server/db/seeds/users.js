export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'NeoByte_42',
      auth0sub: 'auth0|neo123456',
      phone: '+12223334444',
      credits: 1500.75,
      picture: '/public/images/avatars/abe.webp'
    },
    {
      username: 'StellarNomad',
      auth0sub: 'auth0|stellar987654',
      phone: '+13334445555',
      credits: 2380.5,
      picture: '/public/images/avatars/alien.jpg'
    },
    {
      username: 'QuantumRanger',
      auth0sub: 'auth0|quantum0001',
      phone: '+14445556666',
      credits: 3050.3,
      picture: '/public/images/avatars/ex-machina.jpg'
    },
    {
      username: 'GalacticSurge',
      auth0sub: 'auth0|galactic2222',
      phone: '+15556667777',
      credits: 1845.95,
      picture: '/public/images/avatars/gpt1.webp'
    },
    {
      username: 'CryoBlaze',
      auth0sub: 'auth0|cryo3333',
      phone: '+16667778888',
      credits: 920.4,
      picture: '/public/images/avatars/gpt2.webp'
    },
    {
      username: 'PlasmaWave',
      auth0sub: 'auth0|plasma4444',
      phone: '+17778889999',
      credits: 2500.15,
      picture: '/public/images/avatars/Han.jpg'
    },
    {
      username: 'NovaDiver',
      auth0sub: 'auth0|nova5555',
      phone: '+18889990000',
      credits: 780.8,
      picture: '/public/images/avatars/pan.webp'
    },
    {
      username: 'AetherBlade',
      auth0sub: 'auth0|aether6666',
      phone: '+19990001111',
      credits: 1250.5,
      picture: '/public/images/avatars/romulus.avif'
    },
    {
      username: 'OrbitClasher',
      auth0sub: 'auth0|orbit7777',
      phone: '+20001112222',
      credits: 460.25,
      picture: '/public/images/avatars/spaceguy.jpg'
    },
    {
      username: 'VoidVoyager',
      auth0sub: 'auth0|void8888',
      phone: '+21112223333',
      credits: 9999.99,
      picture: '/public/images/avatars/Xb-FQGGMSouNCMy3ZAO03A.webp'
    }
  ])
}
