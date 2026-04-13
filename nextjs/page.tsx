import Header from './src/components/Header';
import Hero from './src/components/Hero';
import MistyForest from './src/components/MistyForest';
import Merchandises from './src/components/Merchandises';
import Events from './src/components/Events';
import AOSInit from './src/components/AOSInit';

export default function Home() {
  return (
    <>
      <AOSInit />
      <Header />
      <Hero />
      <MistyForest />
      <Merchandises />
      <Events />
    </>
  );
}
