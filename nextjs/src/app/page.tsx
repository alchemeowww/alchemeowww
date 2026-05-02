import Header from '../components/Header';
import Hero from '../components/Hero';
import MistyForest from '../components/MistyForest';
import Merchandises from '../components/Merchandises';
import Events from '../components/Events';
import Footer from '../components/Footer';
import AOSInit from '../components/AOSInit';

export default function Home() {
  return (
    <>
      <AOSInit />
      <Header showLogo={false} />
      <Hero />
      <MistyForest />
      <Merchandises />
      <Events />
    </>
  );
}
