'use client';

import Link from 'next/link';
import styles from '../styles/movie.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IMovieProps {
  id: string;
  title: string;
  poster_path: string;
}

export default function Movie({ id, title, poster_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div className={styles.movie}>
      <img src={poster_path} alt={title} onClick={onClick} />
      {/* prefetch를 해주면 movies를 미리 패치해 주어서 속도가 향상되지만
          잘못하면 부하가 커서 서버가 다운될 수 있으니 특정 페이지에 주의깊게 사용해야 함. */}
      <Link prefetch href={`/movies/${id}`}>
        {title}
      </Link>
    </div>
  );
}
