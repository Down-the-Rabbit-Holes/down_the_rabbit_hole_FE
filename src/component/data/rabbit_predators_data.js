const rabbitPredators = [
  {
    name: 'fox',
    characteristics: {
      prey: 'cottontail rabbits, house mice, apples',
      predators: 'larger carnivores like coyotes and mountain lions'
    }
  },
  {
    name: 'coyote',
    characteristics: {
      prey: 'rabbits, field mice, voles, quails, berries',
      predators: 'humans'
    }
  },
  {
    name: 'red-tailed hawk',
    characteristics: {
      prey: 'rabbits, field mice, voles, sparrows, lizards',
      predators: 'larger birds of prey'
    }
  }
];

export default rabbitPredators;

console.log(rabbitPredators);