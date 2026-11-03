import PlayfulNav from './PlayfulNav';
import PlayfulFooter from './PlayfulFooter';
import CursorThread from '../../Elements/CursorThread';
import { BugSticker, CoffeeSticker, DuckSticker, KeycapSticker } from './ThreadStickers';

// A programmer's day along the cursor's red cable: coffee, code, the rubber
// duck, and the bug it's chasing at the tail.
const THREAD_STICKERS = [
  { icon: <CoffeeSticker />, at: 7 },
  { icon: <KeycapSticker />, at: 13 },
  { icon: <DuckSticker />, at: 19 },
  { icon: <BugSticker />, at: 25 },
];

const PlayfulLayout = ({ children }) => (
  <div className="relative flex min-h-screen w-full flex-col bg-[#F2E1C4] text-[#241A12]">
    <CursorThread color="#E5301E" width={3} stickers={THREAD_STICKERS} />
    <PlayfulNav />
    <div className="flex-grow">{children}</div>
    <PlayfulFooter />
  </div>
);

export default PlayfulLayout;
