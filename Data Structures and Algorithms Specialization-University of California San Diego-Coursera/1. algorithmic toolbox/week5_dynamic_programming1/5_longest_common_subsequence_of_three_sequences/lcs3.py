#Uses python3

import sys

def lcs3(x,y,z):
    #wr
    return min(len(x), len(y), len(z))

if __name__ == '__main__':
    input = sys.stdin.read()
    data = list(map(int, input.split()))
    xn = data[0]
    data = data[1:]
    x = data[:an]
    data = data[an:]
    yn = data[0]
    data = data[1:]
    y = data[:bn]
    data = data[bn:]
    zn = data[0]
    data = data[1:]
    z = data[:cn]
    print(lcs3(x, y, z))
