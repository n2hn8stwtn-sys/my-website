#include <iostream>
using namespace std;

void rectangle(int N, int K) {
    for (int i = 0; i < N; i++){
        for (int j = 0; j < K; j++) {
            cout << "*";
        }
        cout << endl;
    }
}