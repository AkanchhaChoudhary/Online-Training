# Uses python3
import sys
from collections import namedtuple

Segment = namedtuple('Segment', 'start end')


def optimal_points(segments):
    segments.sort(key=lambda obj: obj.end, reverse=True)
    points = []
    # write your code here
    tmp_point = 0
    # print(segments)
    while len(segments) != 0:
        base_segment = segments.pop()
        tmp_point = base_segment.end
        while len(segments) != 0 and segments[-1].start <= tmp_point:
            # print(base_segment, segments[-1], tmp_point)
            segments.pop()

        if(tmp_point not in points):
            points.append(tmp_point)

    points.sort()
    return points


if __name__ == '__main__':
    input = sys.stdin.read()
    n, *data = map(int, input.split())
    segments = list(map(lambda x: Segment(x[0], x[1]), zip(data[::2], data[1::2])))
    points = optimal_points(segments)
    print(len(points))
    for p in points:
        print(p, end=' ')
