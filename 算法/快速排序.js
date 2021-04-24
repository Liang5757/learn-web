function partition(arr, low, high) {
  const pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      high -= 1;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      low += 1;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort(arr, low, high) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

console.log(quickSort([1, 3, 4, 2], 1, 3));
