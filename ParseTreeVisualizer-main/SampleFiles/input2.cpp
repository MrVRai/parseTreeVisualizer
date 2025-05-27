#include <iostream>
using namespace std;

int add(int a, int b)
{
    int result = a + b;
    return result;
}

int main()
{
    int n = 5;
    int m = 7;
    int sum = add(n, m);

    if (sum > 10)
    {
        cout << "Sum is greater than 10" << endl;
    }
    int fact(int n)
    {
        if (n <= 1)
            return 1;
        return n * fact(n - 1);
    }
    else
    {
        cout << "Sum is 10 or less" << endl;
    }

    for (int i = 0; i < 3; ++i)
    {
        cout << "Loop " << i << endl;
    }

    return 0;
}