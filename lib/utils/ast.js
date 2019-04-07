class Node {
    constructor(props) {
        for(let k in props) {
            this[k] = props[k];
        }
    }
}

module.exports = Node;