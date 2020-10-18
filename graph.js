class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for(let neighbor of vertex.adjacent){
      vertex.adjacent.delete(neighbor)
      neighbor.adjacent.delete(neighbor)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = new Set([start]), visited = []) {
    visited.push(start.value)
    for(let neighbor of start.adjacent){
      if(!seen.has(neighbor)){
        seen.add(neighbor)
        this.depthFirstSearch(neighbor, seen, visited)
      }
    }

    return visited
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = []
    const searchQueue = [start];
    const seen = new Set();

    while(searchQueue.length){
      let current = searchQueue.shift()
      
      if(!seen.has(current)) {
        visited.push(current.value)
        seen.add(current)
       
        for(let neighbor of current.adjacent){
          searchQueue.push(neighbor)
        }
      }
    }

    return visited
  }
}

module.exports = {Graph, Node}