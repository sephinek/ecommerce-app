import './PageTitle.css';

export default function PageTitle({ text }) {
  return (
    <>
      <h2 className='page-title'>{text}</h2>
      <div className='divider'></div>
    </>
  );
}
