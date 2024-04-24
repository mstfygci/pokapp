import './page.css';

export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
