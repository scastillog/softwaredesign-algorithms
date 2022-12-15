interface WeightedGraph {
  addVertex(vertex: Vertex): void;
  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void;
}

interface Path {
  path: string[];
  distance: number;
}

interface Dijkstra {
  findShortestPath(vertex1: Vertex, vertex2: Vertex): Path;
  findAllShortestPaths(vertex: Vertex): Record<string, Path>;
}

class Vertex {
  constructor(public value: string) {}
}

class Edge {
  constructor(public from: Vertex, public to: Vertex, public weight: number) {}
}

class Graph implements WeightedGraph {
  count: number;
  adjList: { [key: string]: { [key: string]: any } };

  constructor(count: number) {
    this.count = count;
    this.adjList = {};
  }

  addVertex(vertex: Vertex) {
    this.adjList[vertex.value] = {};
  }

  addEdge(start: Vertex, end: Vertex, weight: number) {
    this.adjList[start.value] = Object.assign(this.adjList[start.value], {
      [end.value]: weight,
    });
    this.adjList[end.value] = Object.assign(this.adjList[end.value], {
      [start.value]: weight,
    });
  }
}

class DijkstraMethod {
  constructor(public graph: Graph) {
    this.graph = graph;
  }

  lowestCostNode(
    distances: { [key: number | string]: any },
    visited: Array<number | string>
  ) {
    let shortest: string | number | null = null;
    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];

      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  }

  findShortestPath(start: Vertex, end: Vertex): Path {
    const { adjList } = this.graph;
    const distances: { [key: number | string]: any } = Object.assign(
      { [end.value]: Infinity },
      adjList[start.value]
    );

    const parents: { [key: number | string]: any } = { [end.value]: null };
    for (let child in adjList[start.value]) {
      parents[child] = start.value;
    }

    const visited: Array<string> = [];

    let node = this.lowestCostNode(distances, visited);

    while (node) {
      let distance = distances[node];
      let edges = adjList[node];

      for (const edge in edges) {
        if (String(edge) === String(start.value)) {
          continue;
        } else {
          let newDistance = distance + edges[edge];

          if (!distances[edge] || distances[edge] > newDistance) {
            distances[edge] = newDistance;
            parents[edge] = node;
          }
        }
      }
      visited.push(node);
      node = this.lowestCostNode(distances, visited);
    }

    let shortestPath = [end.value];
    let parent = parents[end.value];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();

    return {
      path: shortestPath,
      distance: distances[end.value],
    };
  }

  findAllShortestPaths(start: Vertex) {
    const { adjList } = this.graph;
    const dist: { [key: string]: any } = Object.keys(adjList).reduce(
      (acc, prev) => {
        return Object.assign(acc, { [prev]: Infinity });
      },
      {}
    );

    const distances = Object.assign(dist, adjList[start.value]);
    distances[start.value] = 0;

    const parents: { [key: number | string]: any } = {};
    for (let child in adjList[start.value]) {
      parents[child] = start.value;
    }
    const visited: Array<string> = [];

    let node = this.lowestCostNode(distances, visited);

    while (node) {
      let distance = distances[node];
      let edges = adjList[node];

      for (const edge in edges) {
        if (String(edge) === String(start.value)) {
          continue;
        } else {
          let newDistance = distance + edges[edge];

          if (!distances[edge] || distances[edge] > newDistance) {
            distances[edge] = newDistance;
            parents[edge] = node;
          }
        }
      }
      visited.push(node);
      node = this.lowestCostNode(distances, visited);
    }

    const paths = {};
    for (const item in adjList) {
      let shortestPath: string[] = [item];
      let parent = parents[item];
      while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
      }
      shortestPath.reverse();
      Object.assign(paths, {
        [item]: { paths: shortestPath, distance: distances[item] },
      });
    }
    return paths;
  }
}

const vertices = [
  new Vertex("1"), //0
  new Vertex("2"), //1
  new Vertex("3"), //2
  new Vertex("4"), //3
  new Vertex("5"), //3
];

const edges = [
  new Edge(vertices[0], vertices[3], 3),
  new Edge(vertices[0], vertices[1], 5),
  new Edge(vertices[0], vertices[2], 4),
  new Edge(vertices[1], vertices[3], 6),
  new Edge(vertices[1], vertices[2], 5),
];

const graph = new Graph(4);

vertices.forEach((verticle) => graph.addVertex(verticle));
edges.forEach((edge) => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstraMethod = new DijkstraMethod(graph);
// console.log(dijkstraMethod.findShortestPath(vertices[3], vertices[2]));
console.log(dijkstraMethod.findAllShortestPaths(vertices[3]));
