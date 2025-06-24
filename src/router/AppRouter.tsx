import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import EditPage from '../pages/EditPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/edit/:id" element={<EditPage />} />
  </Routes>
);

export default AppRouter;
