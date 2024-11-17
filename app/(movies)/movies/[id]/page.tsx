import { resolve } from 'path';
import MovieInfo, { getMovie } from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-videos';
import { Suspense } from 'react';

// async function getMovie(id: string) {
//   console.log(`Fetching movies: ${Date.now()}`);
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   const response = await fetch(`${API_URL}/${id}`);
//   return response.json();
// }

// async function getVideos(id: string) {
//   console.log(`Fetching videos: ${Date.now()}`);
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   const response = await fetch(`${API_URL}/${id}/videos`);
//   return response.json();
// }
interface IParams {
  id: string;
}
export async function generateMetadata({ params }) {
  // const { id }: { id: string } = await params;
  const { id }: IParams = await params;
  // getMovie는 두번 호출되는데 캐싱되기 때문에 성능에는 문제 없다.
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}
export default async function MovieDetailPage({ params }) {
  const { id }: { id: string } = await params;
  // const { region }: { region: string } = await searchParams;
  // console.log(id, region);
  // console.log('=================');
  // console.log('start fetching...');
  // 순차 실행
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);
  // 병렬 실행
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  // console.log('end fetching...');

  // return <h1>{movie.title}</h1>;

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
