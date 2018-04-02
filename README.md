# Genetic Algorithm - Workshop

// TODO: add GIF

## Setup

1. Install dependencies: `npm i`
2. Start project: `npm start`
3. Open http://localhost:1234

## Summary

Here are the tasks you will have to complete:

1. Implement the `seed()` method, that should return a random individual.
2. Implement the `fitness(individual)` method, that should return a score for a given individual.
3. Implement the `crossover(mother, father)` method, that should return an array of children individuals for two given parents individuals.
4. Implement the `mutate(individual)` method, that should mutate and return a giver individual.

## Before you start

// TODO: talk about config file, helpers and lib (subprotocol/genetic-js)

[Slides (french)](https://slides.com/samy-laumonier/introduction-algorithmes-genetiques)

## Step by step

### 1. Implement the `seed()` method

At this step, you will work in the **src/engine/seed.js** file.

In this workshop, an individual is represented as an object with a `genes`
attribute. The value of this attribute is an array of numbers, each number
stands for a direction that the individual will follow:

* `0` is north
* `1` is east
* `2` is south
* `3` is west

Example: the following individual will move 10 times to the west.

```js
const individual = {
  genes: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
};
```

Here are some helpers that you can use:

| Helper | Description | Example |
|---|---|---|
| `getConfig()` | This helper returns the value of the `engineConfig` constant that is defined in the config file. | `const { totalGenes } = this.getConfig();` |
| `getRandomDirection()` | This helper randomly returns one of the directions that are defined in the `engineConfig` constant, in the config file. | `const direction = this.getRandomDirection();` |

<details><summary>Solution</summary><p>

```js
engine.seed = function () {
  const { totalGenes } = this.getConfig();

  return {
    genes: new Array(totalGenes)
      .fill(null)
      .map(() => this.getRandomDirection()),
  };
};
```

</p></details>

### 2. Implement the `fitness(individual)` method

At this step, you will work in the **src/engine/fitness.js** file.

In this workshop, we represent a point with an object that looks like this:

```js
const point = {
  x: 25,
  y: 100,
};
```

To compute the fitness of a given individual, you will have to check all
the successive positions of this one. For each position, you will have
to calculate the distance to the "end" point, and return the best one.

If the individual is on the "end" point, please add to the individual
a `win` attribute, with the value `true`. This will allow the engine to
know that a solution has been found. Example:

```JS
if (distance === 0) {
  individual.win = true;
}
```

Here are some helpers that you can use:

| Helper | Description | Example |
|---|---|---|
| `getConfig()` | This helper returns the value of the `engineConfig` constant that is defined in the config file. | `const { startPoint, endPoint } = this.getConfig();` |
| `moveIndividual(position, direction)` | This helper returns a new position for a given position and a given direction. | `const newPosition = this.moveIndividual(position, direction);` |
| `getDistance(pointA, pointB)` | This helper returns the distance between two points. | `const distance = this.getDistance(pointA, pointB);` |

<details><summary>Solution</summary><p>

```js
engine.fitness = function (individual) {
  const { startPoint, endPoint } = this.getConfig();

  let position = {
    x: startPoint.x,
    y: startPoint.y,
  };

  let bestDistance = Infinity;

  individual.genes.forEach(gene => {
    position = this.moveIndividual(position, gene);
    const distance = this.getDistance(position, endPoint);

    if (distance < bestDistance) {
      bestDistance = distance;
    }

    if (distance === 0) {
      individual.win = true;
    }
  });

  return bestDistance;
};
```

</p></details>

### 3. Implement the `crossover(mother, father)` method

At this step, you will work in the **src/engine/crossover.js** file.

You now have to return an array of two individuals, each should inherit
genes from the parents.

<details><summary>Solution</summary><p>

```js
engine.crossover = function (mother, father) {
  const getHalfLength = genes => Math.floor(genes.length / 2);
  const getLeftHalf = ({ genes }) => genes.slice(0, getHalfLength(genes));
  const getRightHalf = ({ genes }) => genes.slice(getHalfLength(genes), genes.length);

  const daughterGenes = getLeftHalf(mother).concat(getRightHalf(father));
  const sonGenes = getLeftHalf(father).concat(getRightHalf(mother));

  const daughter = { genes: daughterGenes };
  const son = { genes: sonGenes };

  return [daughter, son];
};
```

</p></details>

### 4. Implement the `mutate(individual)` method

At this step, you will work in the **src/engine/mutate.js** file.

Here, you can for instance choose randomly one of the genes of the given
individual, and change it randomly.

You can use the `getRandomDirection()` helper.

<details><summary>Solution</summary><p>

```js
engine.mutate = function (individual) {
  const i = Math.floor(Math.random() * individual.genes.length);
  individual.genes[i] = this.getRandomDirection();

  return individual;
};
```

</p></details>

## Bonus steps

// TODO

## Final solution

You can find a fully working version of the project [here](https://github.com/samybob1/workshop-genetic-algorithm/tree/06894734260f5759b234b04937890f3a1155581a).
