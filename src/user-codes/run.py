def Sorted(s):
    t = []
    while s:
        temp = s.pop()
        while(t and t[-1]<temp):
            s.append(t.pop())
        t.append(temp)
    return t
        
s = []
while True:
    x = int(input())
    if x==-1:
        break
    s.append(x)


a = Sorted(s)

while a:
    print(int(a.pop()),end=" ")