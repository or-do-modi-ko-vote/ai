interface ProgramData {
    code: string
    output: string
    input: string
}
export const aiiData: Record<string, ProgramData> = {

    "p1 Write a program to implement Single Player Game (Using Heuristic Function)  Guess the Number": {
        code: `

import random as rd

print("Guessing the number")
print("Range of Numbers")

start = int(input("enter starting point :"))
end = int(input("enter ending point :"))

think = rd.randint(start,end);

while True:
    guess = int(input("Guess the number :"))
    if guess > think:
        print("Guess a lower number :")
    elif guess < think:
        print("Guess a higher number :")
    else:
        print("You have guessed right number")
        break
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p2 Write a program to implement DFS 8 Puzzle problem": {
        code: `

from copy import deepcopy

goal_state = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
]

moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]

def find_zero(state):
    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                return i, j

def is_goal(state):
    return state == goal_state

def get_neighbors(state):
    x, y = find_zero(state)
    neighbors = []
    for dx, dy in moves:
        nx, ny = x + dx, y + dy
        if 0 <= nx < 3 and 0 <= ny < 3:
            new_state = deepcopy(state)
            new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]
            neighbors.append(new_state)
    return neighbors

def dfs(start_state, max_depth=50):
    stack = [(start_state, [start_state])]
    visited = set()

    while stack:
        state, path = stack.pop()
        state_tuple = tuple(map(tuple, state))

        if state_tuple in visited:
            continue
        visited.add(state_tuple)

        if is_goal(state):
            return path

        if len(path) <= max_depth:
            for neighbor in get_neighbors(state):
                stack.append((neighbor, path + [neighbor]))

    return None

initial_state = [
    [1, 2, 3],
    [4, 0, 6],
    [7, 5, 8]
]

solution = dfs(initial_state)

if solution:
    print(f"Solution found in {len(solution)-1} moves using DFS:")
    for step in solution:
        for row in step:
            print(row)
        print()
else:
    print("No solution found (may be due to depth limit).")
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p3 Write a program to implement BFS Water Jug Problem": {
        code: `

from collections import deque

def is_valid(state, visited):
    return state not in visited

def bfs_water_jug(jug1_capacity, jug2_capacity, target):
    visited = set()
    parent = {}
    queue = deque()

    start = (0, 0)
    queue.append(start)
    visited.add(start)
    parent[start] = None

    while queue:
        x, y = queue.popleft()

        if x == target or y == target:
            path = []
            current = (x, y)
            while current is not None:
                path.append(current)
                current = parent[current]
            path.reverse()
            return path

        next_states = [
            (jug1_capacity, y),
            (x, jug2_capacity),
            (0, y),
            (x, 0),
            (0, x + y) if x + y <= jug2_capacity else (x - (jug2_capacity - y), jug2_capacity),
            (x + y, 0) if x + y <= jug1_capacity else (jug1_capacity, y - (jug1_capacity - x))
        ]

        for state in next_states:
            if is_valid(state, visited):
                visited.add(state)
                parent[state] = (x, y)
                queue.append(state)

    return None

jug1 = 4
jug2 = 3
target = 2
solution_path = bfs_water_jug(jug1, jug2, target)

if solution_path:
    print("Solution steps:")
    for step in solution_path:
        print(step)
else:
    print("No solution found.")
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p4 Write a program to implement Travelling Salesman Problem": {
        code: `

import itertools

graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
]

city_names = ['A', 'B', 'C', 'D']
num_cities = len(graph)

start = 0
cities = list(range(num_cities))

min_cost = float('inf')
best_paths = []

for perm in itertools.permutations(cities[1:]):
    path = [start] + list(perm) + [start]

    cost = 0
    for i in range(len(path) - 1):
        cost += graph[path[i]][path[i + 1]]

    name_path = [city_names[i] for i in path]
    print(f"Path: {'->'.join(name_path)}, Cost: {cost}")

    if cost < min_cost:
        min_cost = cost
        best_paths = [path]

    elif cost == min_cost:
        best_paths.append(path)


# Print results
print("\nShortest Path(s):")

for path in best_paths:
    name_path = [city_names[i] for i in path]
    print("->".join(name_path))

print(f"Minimum Cost: {min_cost}")
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p5 Convert Prolog predicates into Semantic Net.": {
        code: `

import networkx as nx
import matplotlib.pyplot as plt

# Create a directed graph
G = nx.DiGraph()

# --- Prolog Facts as Semantic Net ---

# Family relationships
relations = [
    ("john", "mary", "parent"),
    ("john", "steve", "parent"),
    ("mary", "alice", "parent"),
    ("mary", "bob", "parent"),
    ("alice", "carol", "parent"),
    ("alice", "david", "parent"),
    ("bob", "emily", "parent"),
    ("bob", "frank", "parent"),
]

# Genders
genders = [
    ("john", "male", "is-a"),
    ("steve", "male", "is-a"),
    ("bob", "male", "is-a"),
    ("carol", "male", "is-a"),
    ("david", "male", "is-a"),
    ("frank", "male", "is-a"),
    ("mary", "female", "is-a"),
    ("alice", "female", "is-a"),
    ("emily", "female", "is-a"),
]

# Add nodes & edges
for subj, obj, rel in relations + genders:
    G.add_edge(subj.capitalize(), obj.capitalize(), label=rel)

# Layout
pos = nx.spring_layout(G, k=0.8, seed=42)

# Draw graph
plt.figure(figsize=(10, 7))
nx.draw(
    G, pos,
    with_labels=True,
    node_size=3000,
    node_color="lightblue",
    font_size=9,
    font_weight="bold",
    arrowsize=15
)

# Edge labels
edge_labels = nx.get_edge_attributes(G, 'label')
nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_color="red", font_size=9)

# Show Semantic Net
plt.title("Semantic Net from Prolog Knowledge Base", fontsize=12, fontweight="bold")
plt.show()
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p6 Demonstrate Knowledge Base and Query System in prolog.  Family Prolog ": {
        code: `
https://swish.swi-prolog.org/p/family-knowledge.swinb
parent(john, mary).
parent(john, steve).
parent(mary, alice).
parent(mary, bob).
parent(alice, carol).
parent(alice, david).
parent(bob, emily).
parent(bob, frank).

parent(a, b).
parent(a, c).
parent(b, d).
parent(b, e).
parent(d, f).
parent(d, g).
parent(c, h).
parent(c, i).
parent(i, j).
parent(i, k).

male(john).
male(steve).
male(bob).
male(carol).
male(david).
male(frank).

male(a).
male(b).
male(e).
male(f).
male(g).
male(h).
male(i).
male(k).

female(mary).
female(alice).
female(emily).

female(c).
female(d).
female(j).

grandparent(GP, GC) :-
    parent(GP, Parent),
    parent(Parent, GC).

sibling(X, Y) :-
    parent(P, X),
    parent(P, Y),
    X \= Y.

brother(X, Y) :-
    male(X),
    sibling(X, Y).

sister(X, Y) :-
    female(X),
    sibling(X, Y).

uncle(Uncle, NieceNephew) :-
    brother(Uncle, Parent),
    parent(Parent, NieceNephew).

aunt(Aunt, NieceNephew) :-
    sister(Aunt, Parent),
    parent(Parent, NieceNephew).




aunt(Aunt, david).
uncle(Uncle, carol).
grandparent(GP, emily).
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p7 Demonstrate supervised learning using artificial neural network": {
        code: `
pip install numpy scikit-learn
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X, y = make_classification(
    n_samples=1000,
    n_features=20,
    n_classes=2,
    random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def sigmoid_derivative(x):
    return x * (1 - x)


class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size

        self.weights_input_hidden = np.random.randn(
            input_size, hidden_size
        )
        self.weights_hidden_output = np.random.randn(
            hidden_size, output_size
        )

        self.bias_hidden = np.zeros((1, hidden_size))
        self.bias_output = np.zeros((1, output_size))

    def forward(self, X):
        self.hidden_input = np.dot(
            X, self.weights_input_hidden
        ) + self.bias_hidden

        self.hidden_output = sigmoid(self.hidden_input)

        self.output_input = np.dot(
            self.hidden_output,
            self.weights_hidden_output
        ) + self.bias_output

        self.output = sigmoid(self.output_input)

        return self.output

    def backward(self, X, y, learning_rate):
        y = y.reshape(-1, 1)

        output_error = y - self.output
        output_delta = output_error * sigmoid_derivative(self.output)

        hidden_error = np.dot(
            output_delta,
            self.weights_hidden_output.T
        )

        hidden_delta = hidden_error * sigmoid_derivative(
            self.hidden_output
        )

        self.weights_hidden_output += learning_rate * np.dot(
            self.hidden_output.T,
            output_delta
        )

        self.bias_output += learning_rate * np.sum(
            output_delta, axis=0, keepdims=True
        )

        self.weights_input_hidden += learning_rate * np.dot(
            X.T,
            hidden_delta
        )

        self.bias_hidden += learning_rate * np.sum(
            hidden_delta, axis=0, keepdims=True
        )

    def train(self, X, y, epochs, learning_rate):
        for epoch in range(epochs):
            self.forward(X)
            self.backward(X, y, learning_rate)

            if (epoch + 1) % 100 == 0:
                loss = np.mean((y.reshape(-1, 1) - self.output) ** 2)
                print(f"Epoch {epoch + 1}, Loss: {loss:.4f}")

    def predict(self, X):
        output = self.forward(X)
        return (output >= 0.5).astype(int)


np.random.seed(42)

input_size = X_train_scaled.shape[1]
hidden_size = 10
output_size = 1

nn = NeuralNetwork(
    input_size,
    hidden_size,
    output_size
)

nn.train(
    X_train_scaled,
    y_train,
    epochs=1000,
    learning_rate=0.01
)

y_pred = nn.predict(X_test_scaled).flatten()

accuracy = np.mean(y_pred == y_test) * 100

print("\nTest Accuracy:", accuracy, "%")
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p8 Write a program to implement Travelling Salesman Problem in prolog.": {
        code: `
distance(delhi, mumbai, 1400).
distance(delhi, kolkata, 1500).
distance(delhi, chennai, 2200).
distance(mumbai, kolkata, 2000).
distance(mumbai, chennai, 1300).
distance(kolkata, chennai, 1650).

path(X, Y, D) :- distance(X, Y, D).
path(X, Y, D) :- distance(Y, X, D).

total_distance([_], 0).
total_distance([A,B|Rest], Total) :-
    path(A, B, D1),
    total_distance([B|Rest], D2),
    Total is D1 + D2.

cities([delhi, mumbai, kolkata, chennai]).

tsp(Start, BestFullPath, MinDistance) :-
    cities(Cities),
    member(Start, Cities),
    select(Start, Cities, Others),
    findall(Dist-FullPath,
            ( permutation(Others, Perm),
              append([Start|Perm], [Start], FullPath),
              total_distance(FullPath, Dist)
            ),
            Pairs),
    keysort(Pairs, Sorted),
    Sorted = [MinDistance-BestFullPath | _].


tsp(delhi, BestPath, MinDistance).
tsp(mumbai, BestPath, MinDistance).
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "p9 Implement a single-player game using a heuristic function to guide the player towards the goal.": {
        code: `
initial_state(state(0, 0)).
goal_state(state(4, 4)).

heuristic(state(X, Y), H) :-
    goal_state(state(GX, GY)),
    H is abs(GX - X) + abs(GY - Y).

move(state(X, Y), state(X1, Y)) :-
    X1 is X + 1,
    X1 >= 0,
    X1 =< 4.

move(state(X, Y), state(X1, Y)) :-
    X1 is X - 1,
    X1 >= 0,
    X1 =< 4.

move(state(X, Y), state(X, Y1)) :-
    Y1 is Y + 1,
    Y1 >= 0,
    Y1 =< 4.

move(state(X, Y), state(X, Y1)) :-
    Y1 is Y - 1,
    Y1 >= 0,
    Y1 =< 4.

play(State, Visited) :-
    goal_state(State),
    write('Goal reached at: '),
    write(State),
    nl.

play(State, Visited) :-
    findall(
        H-NextState,
        (
            move(State, NextState),
            \+ member(NextState, Visited),
            heuristic(NextState, H)
        ),
        Moves
    ),
    Moves \= [],
    keysort(Moves, [_-NextState|_]),
    write('Moving to: '),
    write(NextState),
    nl,
    play(NextState, [NextState|Visited]).

start :-
    initial_state(State),
    write('Starting at: '),
    write(State),
    nl,
    play(State, [State]).



start.
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },
    "Program: Tic-Tac-Toe Heuristic Example": {
        code: `
#Implementation of Two Player Tic-Tac-Toe game in Python.

''' We will make the board using dictionary 
    in which keys will be the location(i.e : top-left,mid-right,etc.)
    and initialliy it's values will be empty space and then after every move 
    we will change the value according to player's choice of move. '''

theBoard = {'7': ' ' , '8': ' ' , '9': ' ' ,
            '4': ' ' , '5': ' ' , '6': ' ' ,
            '1': ' ' , '2': ' ' , '3': ' ' }

board_keys = []

for key in theBoard:
    board_keys.append(key)

''' We will have to print the updated board after every move in the game and 
    thus we will make a function in which we'll define the printBoard function
    so that we can easily print the board everytime by calling this function. '''

def printBoard(board):
    print(board['7'] + '|' + board['8'] + '|' + board['9'])
    print('-+-+-')
    print(board['4'] + '|' + board['5'] + '|' + board['6'])
    print('-+-+-')
    print(board['1'] + '|' + board['2'] + '|' + board['3'])

# Now we'll write the main function which has all the gameplay functionality.
def game():

    turn = 'X'
    count = 0


    for i in range(10):
        printBoard(theBoard)
        print("It's your turn," + turn + ".Move to which place?")

        move = input()        

        if theBoard[move] == ' ':
            theBoard[move] = turn
            count += 1
        else:
            print("That place is already filled.\nMove to which place?")
            continue

        # Now we will check if player X or O has won,for every move after 5 moves. 
        if count >= 5:
            if theBoard['7'] == theBoard['8'] == theBoard['9'] != ' ': # across the top
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")                
                break
            elif theBoard['4'] == theBoard['5'] == theBoard['6'] != ' ': # across the middle
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break
            elif theBoard['1'] == theBoard['2'] == theBoard['3'] != ' ': # across the bottom
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break
            elif theBoard['1'] == theBoard['4'] == theBoard['7'] != ' ': # down the left side
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break
            elif theBoard['2'] == theBoard['5'] == theBoard['8'] != ' ': # down the middle
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break
            elif theBoard['3'] == theBoard['6'] == theBoard['9'] != ' ': # down the right side
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break 
            elif theBoard['7'] == theBoard['5'] == theBoard['3'] != ' ': # diagonal
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break
            elif theBoard['1'] == theBoard['5'] == theBoard['9'] != ' ': # diagonal
                printBoard(theBoard)
                print("\nGame Over.\n")                
                print(" **** " +turn + " won. ****")
                break 

        # If neither X nor O wins and the board is full, we'll declare the result as 'tie'.
        if count == 9:
            print("\nGame Over.\n")                
            print("It's a Tie!!")

        # Now we have to change the player after every move.
        if turn =='X':
            turn = 'O'
        else:
            turn = 'X'        
    
    # Now we will ask if player wants to restart the game or not.
    restart = input("Do want to play Again?(y/n)")
    if restart == "y" or restart == "Y":  
        for key in board_keys:
            theBoard[key] = " "

        game()

if __name__ == "__main__":
    game()
`,
        output: `error: invalid syntax (<string>, line 8)`,
        input: `7`
    },

}