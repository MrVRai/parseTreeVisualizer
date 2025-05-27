#include <iostream>
using namespace std;

int main()
{
    for (int i = 1; i <= 3; i++)
    {
        for (int j = 1; j <= 2; j++)
        {
            if (i * j % 2 == 0)
                cout << i << " * " << j << " is even" << endl;
            else
                cout << i << " * " << j << " is odd" << endl;
        }
    }
    return 0;
}