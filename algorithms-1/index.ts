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
  constructor(public value: number) {}
}

class Edge {
  constructor(public from: Vertex, public to: Vertex, public weight: number) {}
}

class Graph implements WeightedGraph {
  count: number;
  adjList: Array<{ vertex: Vertex; edges: Array<Edge> }>;

  constructor(count: number) {
    this.count = count;
    this.adjList = new Array();
  }

  addVertex(vertex: Vertex) {
    this.adjList.push({ vertex, edges: new Array() });
  }

  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number) {
    this.adjList
      .find(({ vertex }) => vertex.value === vertex1.value)
      ?.edges.push(new Edge(vertex1, vertex2, weight));
    this.adjList
      .find(({ vertex }) => vertex.value === vertex2.value)
      ?.edges.push(new Edge(vertex2, vertex1, weight));
  }
}

class DijkstraMethod {
  constructor(public graph: Graph) {
    this.graph = graph;
  }

  // findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {}
  // findAllShortestPaths(vertex: Vertex): Record<string, Path> {}
}

const vertices = [
  new Vertex(1), //0
  new Vertex(2), //1
  new Vertex(3), //2
  new Vertex(4), //3
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
