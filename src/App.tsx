import { StoreProvider, useStore } from './store';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import About from './About';
import Contact from './Contact';

function Router() {
  const { page } = useStore();
  switch (page) {
    case 'shop': return <Shop />;
    case 'product': return <ProductDetail />;
    case 'cart': return <Cart />;
    case 'checkout': return <Checkout />;
    case 'confirmation': return <Confirmation />;
    case 'about': return <About />;
    case 'contact': return <Contact />;
    default: return <Home />;
  }
}

export default function App() {
  return (
    <StoreProvider>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </StoreProvider>
  );
}
