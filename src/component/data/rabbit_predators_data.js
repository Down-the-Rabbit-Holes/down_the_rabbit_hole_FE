const rabbitPredators = [
  {
    name: 'fox',
    characteristics: {
      prey: 'cottontail rabbits, house mice, apples',
      predators: 'larger carnivores like coyotes and mountain lions'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Fox_-_British_Wildlife_Centre_%2817429406401%29.jpg'

  },
  {
    name: 'bobcat',
    characteristics: {
      prey: 'rabbits, squirrels, quails',
      predators: 'humans, mountain lions'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Bobcat2.jpg'    
  },
  {
    name: 'red-tailed hawk',
    characteristics: {
      prey: 'rabbits, field mice, voles, sparrows, lizards',
      predators: 'larger birds of prey'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Buteo_jamaicensis_-John_Heinz_National_Wildlife_Refuge_at_Tinicum%2C_Pennsylvania%2C_USA-8.jpg'
  }
];

export default rabbitPredators;

console.log(rabbitPredators);