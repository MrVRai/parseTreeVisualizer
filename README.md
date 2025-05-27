# Parse Tree Visualizer

## Overview

The **Parse Tree Visualizer** is a command-line utility developed in **C++** to graphically represent the syntactic structure of code according to a context-free grammar. It generates a parse tree in DOT format, which can be rendered using **Graphviz** for improved readability and analysis.

## Purpose

- Visualize parse trees for easier interpretation of code structure.
- Assist in debugging grammars and analyzing language syntax.
- Support educational and research applications in compiler design.

## Technology Stack

- **Language:** C++, HTML, JS, CSS
- **Visualization:** d3.js
- **Parser:** Custom Recursive Descent (or Flex/Bison if extended)
- 

## Usage

1. **Compile the program:**
   ```bash
   g++ -o parse_tree_visualizer main.cpp

    Run the executable:

./parse_tree_visualizer

Convert the generated DOT file to an image:

    dot -Tpng parse_tree.dot -o parse_tree.png

Dependencies

    C++ Compiler (g++)

    d3.js(visualize the tree)
    

License

Distributed under the MIT License.


