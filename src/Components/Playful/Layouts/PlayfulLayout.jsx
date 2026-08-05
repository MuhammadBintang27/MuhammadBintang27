import PlayfulNav from './PlayfulNav';
import PlayfulFooter from './PlayfulFooter';

const PlayfulLayout = ({ children }) => (
  <div className="relative flex min-h-screen w-full flex-col bg-[#F2E1C4] text-[#241A12]">
    <PlayfulNav />
    <div className="flex-grow">{children}</div>
    <PlayfulFooter />
  </div>
);

export default PlayfulLayout;
