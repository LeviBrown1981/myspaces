200.times do
  name = Faker::TvShows::RickAndMorty.character
  registry = Faker::Games::Witcher.school
  avatar = Faker::Avatar.image(slug: name, size: '100x400', format:'png', set: 'set4')
  Person.create(name: name, registry: registry, avatar: avatar)
end

puts "200 People Seeded"