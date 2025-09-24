// routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import ListingDetail from './pages/ListingDetail';
import NewListing from './pages/NewListing';
export const router = createBrowserRouter([
{ path: '/', element: <Home/> },
{ path: '/c/:category', element: <Category/> },
{ path: '/listing/:id', element: <ListingDetail/> },
{ path: '/sell/new', element: <NewListing/> },
]);