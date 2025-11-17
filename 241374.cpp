#include<iostream>
#include<cstdlib>
using namespace std;

int *rowmapping(int arr[][3], int p, int q)
{
	static int a[9];
	int k = 0;
	for (int i = 0; i < p; i++) // loop through each row
	{
		for (int j = 0; j < q; j++) // loop through each column
		{
			a[k] = arr[i][j];
			k++;
		}
	}
	return a;
}
// Function to rebuild a 2-D array from a 1-D array stored in row-major order
void reverseRowMapping(int oneD[], int row, int col, int twoD[][3])
{
	for (int index = 0; index < row * col; index++)
	{
		int i = index / col; // row index
		int j = index % col; // column index
		twoD[i][j] = oneD[index];
	}
}
// Function to convert a 2-D array into a 1-D array using column-major order
int* columnMapping(int arr[][3], int p, int q)
{
	static int a[9];
	int k = 0;
	for (int j = 0; j < q; j++) // move across columns first
	{
		for (int i = 0; i < p; i++) // then move down the rows
		{
			a[k] = arr[i][j];
			k++;
		}
	}
	return a;
}
// Function to restore a 2-D array from a column-major 1-D array
void reverseColumnMapping(int oneD[], int row, int col, int twoD[][3])
{
	for (int index = 0; index < row * col; index++)
	{
		int i = index % row; // row index
		int j = index / row; // column index
		twoD[i][j] = oneD[index];
	}
}
// Extract the diagonal elements of a square matrix into a 1-D array
int* diagonalMapping(int arr[][3], int p, int q)
{
	int static a[3];
	for (int i = 0; i < p; i++)
	{
		a[i] = arr[i][i]; // diagonal elements satisfy i == j
	}
	return a;
}
// Convert back from the diagonal 1-D array to a 2-D representation
int reversedDiagonalMapping(int arr[], int i, int j)
{
	if (i == j)
	{
		return arr[i];
	}
	else
	{
		return 0;
	}
}
// Store only the three diagonals of a tridiagonal matrix into a 1-D array
int* tridiagonalMapping(int arr[][4], int p, int q)
{
	static int a[3 * 3 - 2]; // array length based on 3n-2
	int k = 0;
	for (int i = 0; i < p; i++) // main diagonal
	{
		a[k++] = arr[i][i];
	}
	for (int i = 0; i < p - 1; i++) // upper diagonal
	{
		a[k++] = arr[i][i + 1];
	}
	for (int i = 0; i < p - 1; i++) // lower diagonal
	{
		a[k++] = arr[i + 1][i];
	}
	return a;
}
// Reconstruct a tridiagonal matrix from the 1-D form
int reverseTridiagonalMapping(int a[], int i, int j, int n)
{
	if (i == j) // main diagonal
	{
		return a[i];
	}
	else if (i == j - 1) // upper diagonal
	{
		return a[n + j - 1];
	}
	else if (i == j + 1) // lower diagonal
	{
		return a[n + (n - 1) + j];
	}
	else
	{
		return 0; // elements outside the three diagonals are zero
	}
}
// Flatten a lower triangular matrix into 1-D
int* lowerTriangularMapping(int arr[][4], int p, int q)
{
	static int a[4 * (4 + 1) / 2]; // n*(n+1)/2 elements
	int c = 0;
	for (int i = 0; i < p; i++)
	{
		for (int j = 0; j < q; j++)
		{
			if (i >= j) // positions in or below main diagonal
			{
				a[c] = arr[i][j];
				c++;
			}
		}
	}
	return a;
}
// Expand the 1-D lower triangular array back into 2-D
int reverseLowerTriangularMapping(int arr[], int i, int j)
{
	if (j > i)
	{
		return 0;
	}
	else
	{
		return arr[((i * (i + 1) / 2) + j)];
	}
}
// Flatten an upper triangular matrix into 1-D
int* UpperTriangularMapping(int arr[][4], int p, int q)
{
	static int a[4 * (4 + 1) / 2]; // n*(n+1)/2 elements
	int c = 0;
	for (int i = 0; i < p; i++)
	{
		for (int j = 0; j < q; j++)
		{
			if (i <= j) // positions in or above main diagonal
			{
				a[c] = arr[i][j];
				c++;
			}
		}
	}
	return a;
}
// Expand the 1-D upper triangular array back to 2-D
int reverseUpperTriangularMapping(int arr[], int i, int j, int n)
{
	if (i > j)
	{
		return 0;
	}
	else
	{
		return arr[(i * (2 * n - i + 1)) / 2 + (j - i)];
	}
}
// Store only the lower half of a symmetric matrix into 1-D
int* symmetricMapping(int arr[][4], int n)
{
	static int a[4 * (4 + 1) / 2]; // n*(n+1)/2 elements
	int c = 0;

	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j <= i; j++) // take lower half
		{
			a[c++] = arr[i][j];
		}
	}
	return a;
}
// Retrieve original symmetric matrix values from the 1-D storage
int reverseSymmetricMapping(int arr[], int i, int j, int n)
{
	if (i >= j) // lower part
	{
		return arr[(i * (i + 1)) / 2 + j];
	}
	else // upper part mirrors lower part
	{
		return arr[(j * (j + 1)) / 2 + i];
	}
}
int main()
{
	// Sample matrices for demonstration
	int arr3x3[3][3] = {
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9}
	};

	int arr4x4[4][4] = {
		{1, 2, 3, 4},
		{5, 6, 7, 8},
		{9, 10, 11, 12},
		{13, 14, 15, 16}
	};

	cout << "*Row Major Mapping ***\n";
	int* rowMapped = rowmapping(arr3x3, 3, 3);
	for (int i = 0; i < 9; i++) cout << rowMapped[i] << " ";
	cout << "\nReversed Row Major:\n";
	int revRow[3][3];
	reverseRowMapping(rowMapped, 3, 3, revRow);
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) cout << revRow[i][j] << " ";
		cout << "\n";
	}

	cout << "\n*** Column Major Mapping ***\n";
	int* colMapped = columnMapping(arr3x3, 3, 3);
	for (int i = 0; i < 9; i++) cout << colMapped[i] << " ";
	cout << "\nReversed Column Major:\n";
	int revCol[3][3];
	reverseColumnMapping(colMapped, 3, 3, revCol);
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) cout << revCol[i][j] << " ";
		cout << "\n";
	}

	cout << "\n*** Diagonal Mapping ***\n";
	int* diagMapped = diagonalMapping(arr3x3, 3, 3);
	for (int i = 0; i < 3; i++) cout << diagMapped[i] << " ";
	cout << "\nReversed Diagonal:\n";
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) cout << reversedDiagonalMapping(diagMapped, i, j) << " ";
		cout << "\n";
	}

	cout << "\n*** TriDiagonal Mapping ***\n";
	int* triMapped = tridiagonalMapping(arr4x4, 4, 4);
	for (int i = 0; i < 10; i++) cout << triMapped[i] << " ";
	cout << "\nReversed TriDiagonal:\n";
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) cout << reverseTridiagonalMapping(triMapped, i, j, 4) << " ";
		cout << "\n";
	}

	cout << "\n*** Lower Triangular Mapping ***\n";
	int* lowerMapped = lowerTriangularMapping(arr4x4, 4, 4);
	for (int i = 0; i < 10; i++) cout << lowerMapped[i] << " ";
	cout << "\nReversed Lower Triangular:\n";
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) cout << reverseLowerTriangularMapping(lowerMapped, i, j) << " ";
		cout << "\n";
	}

	cout << "\n*** Upper Triangular Mapping ***\n";
	int* upperMapped = UpperTriangularMapping(arr4x4, 4, 4);
	for (int i = 0; i < 10; i++) cout << upperMapped[i] << " ";
	cout << "\nReversed Upper Triangular:\n";
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) cout << reverseUpperTriangularMapping(upperMapped, i, j, 4) << " ";
		cout << "\n";
	}

	cout << "\n*** Symmetric Mapping ***\n";
	int* symMapped = symmetricMapping(arr4x4, 4);
	for (int i = 0; i < 10; i++) cout << symMapped[i] << " ";
	cout << "\nReversed Symmetric:\n";
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) cout << reverseSymmetricMapping(symMapped, i, j, 4) << " ";
		cout << "\n";
	}

	return 0;
}