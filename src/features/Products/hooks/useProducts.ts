import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productService';

export function useProducts() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts().then(setData);
  }, []);

  return { data };
}
