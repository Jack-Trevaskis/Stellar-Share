/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex('users').del()
  await knex('stuff').del()
  await knex('user_reviews').del()
  await knex('stuff_reviews').del()

  await knex('users').insert([
    {
      id: 1,
      auth0_sub: 'auth0|neo123456',
      name: 'NeoByte_42',
      email: 'neo42@example.com',
      picture: 'https://example.com/images/neobyte.png'
    },
    {
      id: 2,
      auth0_sub: 'auth0|stellar987654',
      name: 'StellarNomad',
      email: 'stellar.nomad@example.com',
      picture: 'https://example.com/images/stellarnomad.png'
    },
    {
      id: 3,
      auth0_sub: 'auth0|quantum0001',
      name: 'QuantumRanger',
      email: 'quantum.ranger@example.com',
      picture: 'https://example.com/images/quantumranger.png'
    },
    {
      id: 4,
      auth0_sub: 'auth0|galactic2222',
      name: 'GalacticSurge',
      email: 'galactic.surge@example.com',
      picture: 'https://example.com/images/galacticsurge.png'
    },
    {
      id: 5,
      auth0_sub: 'auth0|cryo3333',
      name: 'CryoBlaze',
      email: 'cryo.blaze@example.com',
      picture: 'https://example.com/images/cryoblaze.png'
    },
    {
      id: 6,
      auth0_sub: 'auth0|plasma4444',
      name: 'PlasmaWave',
      email: 'plasma.wave@example.com',
      picture: 'https://example.com/images/plasmawave.png'
    },
    {
      id: 7,
      auth0_sub: 'auth0|nova5555',
      name: 'NovaDiver',
      email: 'nova.diver@example.com',
      picture: 'https://example.com/images/novadiver.png'
    },
    {
      id: 8,
      auth0_sub: 'auth0|aether6666',
      name: 'AetherBlade',
      email: 'aether.blade@example.com',
      picture: 'https://example.com/images/aetherblade.png'
    },
    {
      id: 9,
      auth0_sub: 'auth0|orbit7777',
      name: 'OrbitClasher',
      email: 'orbit.clasher@example.com',
      picture: 'https://example.com/images/orbitclasher.png'
    },
    {
      id: 10,
      auth0_sub: 'auth0|void8888',
      name: 'VoidVoyager',
      email: 'void.voyager@example.com',
      picture: 'https://example.com/images/voidvoyager.png'
    }
  ])

  await knex('stuff').insert([
    {
      id: 1,
      name: 'Lightsaber',
      description: 'Was playing around with this thing and accidentally cut my arms off, don’t really have much use for it now...',
      owner_id: 1,
      price: 10,
      image_url: 'https://example.com/images/lightsaber.png',
      bond: 10,
      condition: 'great',
    },
    {
      id: 2,
      name: 'Comet Laser',
      description: 'Rock in way? Rock go boom.',
      owner_id: 1,
      price: 20,
      image_url: 'https://example.com/images/comet_laser.png',
      bond: 20,
      condition: 'great',
    },
    {
      id: 3,
      name: 'Time Turner',
      description: "Turns back time like a charm, but only works for an hour. Use it wisely; don't mess up timelines!",
      owner_id: 2,
      price: 50,
      image_url: 'https://example.com/images/time_turner.png',
      bond: 40,
      condition: 'mint',
    },
    {
      id: 8,
      name: 'Bag of Holding',
      description: "Fits literally everything you own. Don't put snacks in it unless you want an ant infestation.",
      owner_id: 3,
      price: 20,
      image_url: 'https://example.com/images/bag_of_holding.png',
      bond: 15,
      condition: 'used',
    },
  ])

  await knex('user_reviews').insert([
    {
      id: 1,
      reviewer_id: 1,
      user_id: 2,
      description: 'Excellent communication and very friendly!',
      rating: 5,
    },
    {
      id: 2,
      reviewer_id: 2,
      user_id: 3,
      description: 'Quick response but could have been more detailed.',
      rating: 4,
    },
    {
      id: 3,
      reviewer_id: 3,
      user_id: 1,
      description: 'Smooth transaction, highly recommend!',
      rating: 5,
    },
    {
      id: 4,
      reviewer_id: 4,
      user_id: 3,
      description: 'Great overall experience, thanks!',
      rating: 4,
    },
  ])

  await knex('stuff_reviews').insert([
    {
      id: 1,
      reviewer_id: 1,
      stuff_id: 3, 
      description: 'Worked perfectly, saved me from missing my deadline!',
      rating: 5,
    },
    {
      id: 2,
      reviewer_id: 2,
      stuff_id: 1,
      description: 'Cool gadget, but handle with care!',
      rating: 4,
    },
    {
      id: 3,
      reviewer_id: 3,
      stuff_id: 8, 
      description: 'Very useful, but I lost my snacks inside it.',
      rating: 4,
    },
    {
      id: 4,
      reviewer_id: 3,
      stuff_id: 2, 
      description: 'Boom. Just what I needed. Highly recommended!',
      rating: 5,
    },
  ])
}
