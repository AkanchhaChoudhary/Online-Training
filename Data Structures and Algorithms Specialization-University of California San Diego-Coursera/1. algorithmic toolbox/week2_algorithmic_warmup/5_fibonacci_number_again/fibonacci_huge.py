# Uses python3
import sys

def get_fibonacci_huge_naive(n, m):
    if n <= 1:
        return n

    previous = 0
    current  = 1

    for _ in range(n - 1):
        previous, current = current, previous + current

    return current % m

def calc_fib_efficient(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for i in range(2,n+1):
        new = curr + prev
        prev = curr
        curr = new
    return new

def get_pisano_period(n, m):
    
    modulos = [0, 1]
    while True:
        modulos.append((modulos[-1] + modulos[-2])%m)
        if modulos[-1] == 1 and modulos[-2] == 0:
            return len(modulos)-2


def get_fibonacci_huge_efficient(n, m):
    period = get_pisano_period(n, m)
    if period:
        n_ = n % period
    else:
        n_ = n
    fib_small = calc_fib_efficient(n_)
    mod = fib_small % m

    return mod

'''
n, m = int(sys.argv[1]), int(sys.argv[2])
print('remainder = {}'.format(get_fibonacci_huge_efficient(n, m)))
'''
if __name__ == '__main__':
    input = sys.stdin.read();
    print(get_fibonacci_huge_efficient(n, m))
    n, m = map(int, input.split())
