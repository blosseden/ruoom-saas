import { FC } from 'react';
import DemoApp from './DemoApp';

// ── Demo Mode ──────────────────────────────────────────────────────────────
// To restore the original app, replace <DemoApp /> with:
//   <RecoilRoot><Router><AppRouter /></Router></RecoilRoot>
// and re-import { BrowserRouter as Router }, { AppRouter }, { RecoilRoot }
// ──────────────────────────────────────────────────────────────────────────

const App: FC = () => <DemoApp />;

export default App;
