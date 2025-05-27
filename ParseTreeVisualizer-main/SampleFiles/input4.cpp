#include <iostream>
using namespace std;

int square(int x)
{
    return x * x;
}

double square(double x)
{
    return x * x;
}

int main()
{
    cout << square(4) << endl;
    cout << square(2.5) << endl;
    return 0;
}