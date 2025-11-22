import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { BottomNavbar } from './components/generated/BottomNavbar';
import { SchedulePickup } from './components/generated/SchedulePickup';
import { MapsPage } from './components/generated/MapsPage';
import { CameraScanner } from './components/generated/CameraScanner';
import { RecycleOrder } from './components/generated/RecycleOrder';
import { DonationsPage } from './components/generated/DonationsPage';
import { ShopPage } from './components/generated/ShopPage';
import { CartPage, CartItem } from './components/generated/CartPage';
import { CheckoutPage } from './components/generated/CheckoutPage';
import { ListingUploadPage } from './components/generated/ListingUploadPage';
import { UserProfilePage } from './components/generated/UserProfilePage';

let theme: Theme = 'light';
let container: Container = 'centered';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'schedule' | 'map' | 'scan' | 'recycle' | 'donations' | 'shop' | 'cart' | 'checkout' | 'listing' | 'profile'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    if (currentPage === 'schedule') {
      return <SchedulePickup onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'map') {
      return <MapsPage 
        onNavigateToHome={() => setCurrentPage('home')} 
        onNavigateToScan={() => setCurrentPage('scan')}
        onNavigateToShop={() => setCurrentPage('shop')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />;
    }
    if (currentPage === 'scan') {
      return <CameraScanner onBack={() => setCurrentPage('home')} onNavigateToRecycleOrder={() => setCurrentPage('recycle')} />;
    }
    if (currentPage === 'recycle') {
      return <RecycleOrder onBack={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'donations') {
      return <DonationsPage 
        onNavigateToHome={() => setCurrentPage('home')} 
        onNavigateToMap={() => setCurrentPage('map')}
        onNavigateToScan={() => setCurrentPage('scan')}
        onNavigateToShop={() => setCurrentPage('shop')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />;
    }
    if (currentPage === 'shop') {
      return <ShopPage 
        onNavigateToHome={() => setCurrentPage('home')} 
        onNavigateToMap={() => setCurrentPage('map')} 
        onNavigateToScan={() => setCurrentPage('scan')}
        onNavigateToCart={() => setCurrentPage('cart')}
        onNavigateToProfile={() => setCurrentPage('profile')}
        cartItems={cartItems}
        onUpdateCart={setCartItems}
      />;
    }
    if (currentPage === 'cart') {
      return <CartPage 
        cartItems={cartItems}
        onBack={() => setCurrentPage('shop')} 
        onContinueShopping={() => setCurrentPage('shop')}
        onUpdateCart={setCartItems}
        onCheckout={() => setCurrentPage('checkout')}
      />;
    }
    if (currentPage === 'checkout') {
      return <CheckoutPage 
        cartItems={cartItems}
        onBack={() => setCurrentPage('cart')}
        onPaymentComplete={() => {
          setCartItems([]);
          setCurrentPage('home');
        }}
      />;
    }
    if (currentPage === 'listing') {
      return <ListingUploadPage onBack={() => setCurrentPage('home')} onComplete={() => setCurrentPage('home')} />;
    }
    if (currentPage === 'profile') {
      return <UserProfilePage 
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToMap={() => setCurrentPage('map')}
        onNavigateToScan={() => setCurrentPage('scan')}
        onNavigateToShop={() => setCurrentPage('shop')}
      />;
    }
    return <BottomNavbar 
      onNavigateToSchedule={() => setCurrentPage('schedule')}
      onNavigateToMap={() => setCurrentPage('map')}
      onNavigateToScan={() => setCurrentPage('scan')}
      onNavigateToDonations={() => setCurrentPage('donations')}
      onNavigateToShop={() => setCurrentPage('shop')}
      onNavigateToListing={() => setCurrentPage('listing')}
      onNavigateToCart={() => setCurrentPage('cart')}
      onNavigateToProfile={() => setCurrentPage('profile')}
    />;
  }, [currentPage, cartItems]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;