'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

export default function URLSync() {
  const { filters, currentPage } = useSelector((state: RootState) => state.anime);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update search params based on current filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "Any") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Update page number
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    } else {
      params.delete('page');
    }

    const search = params.toString();
    const query = search ? `?${search}` : '';
    const newUrl = `${pathname}${query}`;
    
    // Only update if URL actually changed
    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl);
    }
  }, [filters, currentPage, router, pathname, searchParams]);

  return null;
}
